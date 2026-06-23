import Foundation
import SwiftData

enum EventScheduleConflict {
    static let defaultDurationMinutes = 60

    static func endDate(for event: EventItem) -> Date {
        endDate(start: event.date, durationMinutes: effectiveDuration(for: event))
    }

    static func effectiveDuration(for event: EventItem) -> Int {
        event.durationMinutes > 0 ? event.durationMinutes : defaultDurationMinutes
    }

    static func endDate(start: Date, durationMinutes: Int) -> Date {
        start.addingTimeInterval(TimeInterval(max(durationMinutes, 1) * 60))
    }

    static func overlaps(startA: Date, durationA: Int, startB: Date, durationB: Int) -> Bool {
        let endA = endDate(start: startA, durationMinutes: durationA)
        let endB = endDate(start: startB, durationMinutes: durationB)
        return startA < endB && startB < endA
    }

    @MainActor
    static func conflictingEvents(
        start: Date,
        durationMinutes: Int,
        excluding eventID: UUID? = nil,
        context: ModelContext
    ) -> [EventItem] {
        let descriptor = FetchDescriptor<EventItem>()
        guard let all = try? context.fetch(descriptor) else { return [] }

        return all.filter { event in
            if let eventID, event.id == eventID { return false }
            return overlaps(
                startA: start,
                durationA: durationMinutes,
                startB: event.date,
                durationB: effectiveDuration(for: event)
            )
        }
        .sorted { $0.date < $1.date }
    }

    @MainActor
    static func conflictingEvent(
        start: Date,
        durationMinutes: Int,
        excluding eventID: UUID? = nil,
        context: ModelContext
    ) -> EventItem? {
        conflictingEvents(
            start: start,
            durationMinutes: durationMinutes,
            excluding: eventID,
            context: context
        ).first
    }

    static func formattedConflictsList(_ events: [EventItem]) -> String {
        events.map { formattedConflict($0) }.joined(separator: "\n")
    }

    static func formattedConflict(_ event: EventItem) -> String {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "cs_CZ")
        formatter.dateStyle = .medium
        formatter.timeStyle = .short
        let end = endDate(for: event)
        let endFormatter = DateFormatter()
        endFormatter.locale = Locale(identifier: "cs_CZ")
        endFormatter.dateStyle = .none
        endFormatter.timeStyle = .short
        return "\(event.title) · \(formatter.string(from: event.date))–\(endFormatter.string(from: end))"
    }
}
