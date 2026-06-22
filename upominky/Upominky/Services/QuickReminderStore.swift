import Foundation

/// Rychlé připomínky (30 a 10 min) — mimo SwiftData, aby upgrade appky nerozbil uložená data.
enum QuickReminderStore {
    private static let key = "upominky.quickReminderEventIDs"

    static func isQuick(_ event: EventItem) -> Bool {
        ids.contains(event.id.uuidString)
    }

    static func setQuick(_ event: EventItem, enabled: Bool) {
        var next = ids
        let id = event.id.uuidString
        if enabled {
            next.insert(id)
        } else {
            next.remove(id)
        }
        save(next)
    }

    static func remove(_ event: EventItem) {
        var next = ids
        next.remove(event.id.uuidString)
        save(next)
    }

    private static var ids: Set<String> {
        Set(UserDefaults.standard.stringArray(forKey: key) ?? [])
    }

    private static func save(_ ids: Set<String>) {
        UserDefaults.standard.set(Array(ids), forKey: key)
    }
}
