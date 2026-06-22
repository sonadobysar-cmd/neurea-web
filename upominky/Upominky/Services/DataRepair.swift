import Foundation
import SwiftData

enum DataRepair {
    @MainActor
    static func normalize(context: ModelContext) {
        let descriptor = FetchDescriptor<EventItem>()
        guard let events = try? context.fetch(descriptor) else { return }

        var changed = false
        for event in events where event.durationMinutes <= 0 {
            event.durationMinutes = EventScheduleConflict.defaultDurationMinutes
            changed = true
        }
        if changed {
            try? context.save()
        }
    }
}
