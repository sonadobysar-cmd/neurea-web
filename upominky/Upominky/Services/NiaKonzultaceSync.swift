import Foundation
import SwiftData

private struct NiaSyncBooking: Decodable {
    let ref: String
    let title: String
    let dateIso: String
    let time: String
    let meetUrl: String
}

private struct NiaSyncResponse: Decodable {
    let ok: Bool
    let bookings: [NiaSyncBooking]
}

enum NiaKonzultaceSync {
    private static let prague = TimeZone(identifier: "Europe/Prague")!
    private static let workCategoryName = "Práce"

    @MainActor
    static func syncIfConfigured(context: ModelContext) async {
        guard NiaSyncConfig.isConfigured else { return }

        guard let url = URL(string: "/api/nia/konzultace/sync", relativeTo: NiaSyncConfig.apiBaseURL) else {
            return
        }

        var request = URLRequest(url: url)
        request.setValue("Bearer \(NiaSyncConfig.syncToken)", forHTTPHeaderField: "Authorization")

        let data: Data
        do {
            let (responseData, response) = try await URLSession.shared.data(for: request)
            guard let http = response as? HTTPURLResponse, http.statusCode == 200 else { return }
            data = responseData
        } catch {
            return
        }

        let decoded: NiaSyncResponse
        do {
            decoded = try JSONDecoder().decode(NiaSyncResponse.self, from: data)
        } catch {
            return
        }
        guard decoded.ok else { return }

        let workCategoryId = categoryId(named: workCategoryName, context: context)
        let activeRefs = Set(decoded.bookings.map { externalRef(for: $0.ref) })

        for booking in decoded.bookings {
            guard let eventDate = combineDate(dateIso: booking.dateIso, time: booking.time) else { continue }
            let ref = externalRef(for: booking.ref)
            let title = booking.title.trimmingCharacters(in: .whitespacesAndNewlines)

            if let existing = fetchEvent(externalRef: ref, context: context) {
                let changed = existing.title != title || abs(existing.date.timeIntervalSince(eventDate)) > 60
                existing.title = title
                existing.date = eventDate
                if existing.categoryId == nil {
                    existing.categoryId = workCategoryId
                }
                if changed {
                    await ReminderScheduler.reschedule(for: existing)
                }
            } else {
                let event = EventItem(
                    title: title,
                    date: eventDate,
                    categoryId: workCategoryId,
                    externalRef: ref
                )
                context.insert(event)
                await ReminderScheduler.schedule(for: event)
            }
        }

        removeStaleSyncedEvents(activeRefs: activeRefs, context: context)
        try? context.save()
    }

    // MARK: - Private

    private static func externalRef(for ref: String) -> String {
        "nia:\(ref)"
    }

    private static func combineDate(dateIso: String, time: String) -> Date? {
        let dateParts = dateIso.split(separator: "-").compactMap { Int($0) }
        let timeParts = time.split(separator: ":").compactMap { Int($0) }
        guard dateParts.count == 3, timeParts.count == 2 else { return nil }

        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = prague
        var components = DateComponents()
        components.year = dateParts[0]
        components.month = dateParts[1]
        components.day = dateParts[2]
        components.hour = timeParts[0]
        components.minute = timeParts[1]
        return calendar.date(from: components)
    }

    @MainActor
    private static func categoryId(named name: String, context: ModelContext) -> UUID? {
        let descriptor = FetchDescriptor<CategoryTag>(
            predicate: #Predicate { $0.name == name }
        )
        return (try? context.fetch(descriptor))?.first?.id
    }

    @MainActor
    private static func fetchEvent(externalRef: String, context: ModelContext) -> EventItem? {
        let descriptor = FetchDescriptor<EventItem>(
            predicate: #Predicate { $0.externalRef == externalRef }
        )
        return (try? context.fetch(descriptor))?.first
    }

    @MainActor
    private static func removeStaleSyncedEvents(activeRefs: Set<String>, context: ModelContext) {
        let descriptor = FetchDescriptor<EventItem>(
            predicate: #Predicate { item in
                item.externalRef != nil
            }
        )
        guard let synced = try? context.fetch(descriptor) else { return }

        for event in synced {
            guard let ref = event.externalRef, ref.hasPrefix("nia:") else { continue }
            if !activeRefs.contains(ref) {
                ReminderScheduler.cancel(for: event)
                context.delete(event)
            }
        }
    }
}
