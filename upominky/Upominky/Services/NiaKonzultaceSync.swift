import Foundation
import SwiftData

private struct NiaSyncBooking: Decodable {
    let ref: String
    let title: String
    let dateIso: String
    let time: String
    let meetUrl: String
    let durationMin: Int?
}

private struct NiaSyncResponse: Decodable {
    let ok: Bool
    let bookings: [NiaSyncBooking]
}

/// Zabrání souběžnému syncu — ten mohl zamrznout appku.
private actor NiaSyncCoordinator {
    static let shared = NiaSyncCoordinator()

    private var isRunning = false
    private var lastFinished: Date?

    func begin(minInterval: TimeInterval = 15) -> Bool {
        if isRunning { return false }
        if let lastFinished, Date().timeIntervalSince(lastFinished) < minInterval {
            return false
        }
        isRunning = true
        return true
    }

    func finish() {
        isRunning = false
        lastFinished = Date()
    }

    func forceBegin() -> Bool {
        if isRunning { return false }
        isRunning = true
        return true
    }
}

enum NiaKonzultaceSync {
    private static let prague = TimeZone(identifier: "Europe/Prague")!
    private static let workCategoryName = "Práce"
    private static let konzultaceDurationMin = 30

    /// `force` = tažení seznamu dolů (ignoruje časový interval)
    @MainActor
    @discardableResult
    static func syncIfConfigured(context: ModelContext, force: Bool = false) async -> Int {
        guard NiaSyncConfig.isConfigured else { return 0 }

        let allowed = force
            ? await NiaSyncCoordinator.shared.forceBegin()
            : await NiaSyncCoordinator.shared.begin()
        guard allowed else { return 0 }

        defer {
            Task { await NiaSyncCoordinator.shared.finish() }
        }

        guard let bookings = await fetchRemoteBookings() else { return 0 }
        return await apply(bookings, context: context)
    }

    // MARK: - Remote (síť mimo UI vlákno)

    private static func fetchRemoteBookings() async -> [NiaSyncBooking]? {
        guard let url = URL(string: "/api/nia/konzultace/sync", relativeTo: NiaSyncConfig.apiBaseURL) else {
            return nil
        }

        var request = URLRequest(url: url)
        request.setValue("Bearer \(NiaSyncConfig.syncToken)", forHTTPHeaderField: "Authorization")
        request.timeoutInterval = 12

        do {
            let (data, response) = try await URLSession.shared.data(for: request)
            guard let http = response as? HTTPURLResponse, http.statusCode == 200 else { return nil }
            let decoded = try JSONDecoder().decode(NiaSyncResponse.self, from: data)
            guard decoded.ok else { return nil }
            return decoded.bookings
        } catch {
            return nil
        }
    }

    // MARK: - Apply

    @MainActor
    private static func apply(_ bookings: [NiaSyncBooking], context: ModelContext) async -> Int {
        let workCategoryId = categoryId(named: workCategoryName, context: context)
        let activeRefs = Set(bookings.map { externalRef(for: $0.ref) })
        var imported = 0

        for booking in bookings {
            guard let eventDate = combineDate(dateIso: booking.dateIso, time: booking.time) else { continue }
            let ref = externalRef(for: booking.ref)
            if NiaSyncDismissedStore.isDismissed(ref: ref) { continue }
            let title = booking.title.trimmingCharacters(in: .whitespacesAndNewlines)
            let duration = booking.durationMin ?? konzultaceDurationMin

            if let existing = fetchEvent(externalRef: ref, context: context) {
                let changed = existing.title != title
                    || abs(existing.date.timeIntervalSince(eventDate)) > 60
                    || existing.durationMinutes != duration
                existing.title = title
                existing.date = eventDate
                existing.durationMinutes = duration
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
                    externalRef: ref,
                    durationMinutes: duration
                )
                context.insert(event)
                await ReminderScheduler.schedule(for: event)
                imported += 1
            }
        }

        removeStaleSyncedEvents(activeRefs: activeRefs, context: context)
        try? context.save()
        return imported
    }

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
                QuickReminderStore.remove(event)
                context.delete(event)
            }
        }
    }
}
