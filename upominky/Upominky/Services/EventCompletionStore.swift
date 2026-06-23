import Foundation

enum EventCompletionStatus: String {
    case completed
    case missed
}

enum EventCompletionStore {
    private static let key = "upominky.eventCompletion"

    static func status(for event: EventItem) -> EventCompletionStatus? {
        guard let raw = storage[event.id.uuidString] else { return nil }
        return EventCompletionStatus(rawValue: raw)
    }

    static func setStatus(_ status: EventCompletionStatus, for event: EventItem) {
        var next = storage
        next[event.id.uuidString] = status.rawValue
        save(next)
    }

    static func remove(_ event: EventItem) {
        var next = storage
        next.removeValue(forKey: event.id.uuidString)
        save(next)
    }

    private static var storage: [String: String] {
        UserDefaults.standard.dictionary(forKey: key) as? [String: String] ?? [:]
    }

    private static func save(_ storage: [String: String]) {
        UserDefaults.standard.set(storage, forKey: key)
    }
}
