import Foundation
import UserNotifications

enum ReminderKind: String, CaseIterable {
    case eveningBefore = "evening"
    case morningOf = "morning"
    case oneHourBefore = "hour"

    var label: String {
        switch self {
        case .eveningBefore: return "večer předem"
        case .morningOf: return "ráno v den D"
        case .oneHourBefore: return "1 hodinu předem"
        }
    }
}

enum ReminderScheduler {
    private static let calendar = Calendar.current

    static func requestPermission() async -> Bool {
        let center = UNUserNotificationCenter.current()
        do {
            return try await center.requestAuthorization(options: [.alert, .sound, .badge])
        } catch {
            return false
        }
    }

    static func schedule(for event: EventItem) async {
        let center = UNUserNotificationCenter.current()
        let pending = reminderDates(for: event)

        for (kind, fireDate) in pending {
            let content = UNMutableNotificationContent()
            content.title = "Upomínka"
            content.body = notificationBody(for: event, kind: kind)
            content.sound = .default

            let components = calendar.dateComponents(
                [.year, .month, .day, .hour, .minute],
                from: fireDate
            )
            let trigger = UNCalendarNotificationTrigger(dateMatching: components, repeats: false)
            let request = UNNotificationRequest(
                identifier: notificationID(eventID: event.id, kind: kind),
                content: content,
                trigger: trigger
            )
            try? await center.add(request)
        }
    }

    static func cancel(for event: EventItem) {
        let ids = ReminderKind.allCases.map { notificationID(eventID: event.id, kind: $0) }
        UNUserNotificationCenter.current().removePendingNotificationRequests(withIdentifiers: ids)
    }

    static func reminderDates(for event: EventItem) -> [(ReminderKind, Date)] {
        let now = Date()
        var result: [(ReminderKind, Date)] = []

        if let evening = eveningBeforeDate(for: event.date), evening > now {
            result.append((.eveningBefore, evening))
        }
        if let morning = morningOfDate(for: event.date), morning > now, morning < event.date {
            result.append((.morningOf, morning))
        }
        if let hourBefore = calendar.date(byAdding: .hour, value: -1, to: event.date),
           hourBefore > now {
            result.append((.oneHourBefore, hourBefore))
        }

        return result.sorted { $0.1 < $1.1 }
    }

    static func plannedReminderLabels(for event: EventItem) -> [String] {
        reminderDates(for: event).map { kind, date in
            "\(kind.label) · \(formatted(date))"
        }
    }

    // MARK: - Private

    private static func notificationID(eventID: UUID, kind: ReminderKind) -> String {
        "event-\(eventID.uuidString)-\(kind.rawValue)"
    }

    private static func eveningBeforeDate(for eventDate: Date) -> Date? {
        guard let dayBefore = calendar.date(byAdding: .day, value: -1, to: startOfDay(for: eventDate)) else {
            return nil
        }
        return calendar.date(bySettingHour: 18, minute: 0, second: 0, of: dayBefore)
    }

    private static func morningOfDate(for eventDate: Date) -> Date? {
        calendar.date(bySettingHour: 8, minute: 0, second: 0, of: startOfDay(for: eventDate))
    }

    private static func startOfDay(for date: Date) -> Date {
        calendar.startOfDay(for: date)
    }

    private static func notificationBody(for event: EventItem, kind: ReminderKind) -> String {
        let when = formattedEventTime(event.date)
        switch kind {
        case .eveningBefore:
            return "Zítra \(when) · \(event.title)"
        case .morningOf:
            return "Dnes \(when) · \(event.title)"
        case .oneHourBefore:
            return "Za hodinu · \(event.title)"
        }
    }

    private static func formattedEventTime(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "cs_CZ")
        formatter.dateStyle = .none
        formatter.timeStyle = .short
        return "v \(formatter.string(from: date))"
    }

    private static func formatted(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "cs_CZ")
        formatter.dateStyle = .short
        formatter.timeStyle = .short
        return formatter.string(from: date)
    }
}
