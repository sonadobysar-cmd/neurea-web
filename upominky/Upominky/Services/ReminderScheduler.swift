import Foundation
import UserNotifications

enum ReminderKind: String, CaseIterable {
    case eveningBefore18 = "evening18"
    case eveningBefore21 = "evening21"
    case morningOf = "morning"
    case oneHourBefore = "hour"

    var label: String {
        switch self {
        case .eveningBefore18: return "večer předem v 18:00"
        case .eveningBefore21: return "večer předem v 21:00"
        case .morningOf: return "ráno v den D v 8:00"
        case .oneHourBefore: return "1 hodinu předem"
        }
    }
}

enum ReminderScheduler {
    private static let calendar = Calendar.current
    private static let legacyKinds = ["evening"]

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

    static func reschedule(for event: EventItem) async {
        cancel(for: event)
        await schedule(for: event)
    }

    static func cancel(for event: EventItem) {
        var ids = ReminderKind.allCases.map { notificationID(eventID: event.id, kind: $0) }
        ids += legacyKinds.map { "event-\(event.id.uuidString)-\($0)" }
        UNUserNotificationCenter.current().removePendingNotificationRequests(withIdentifiers: ids)
    }

    static func reminderDates(for event: EventItem) -> [(ReminderKind, Date)] {
        let now = Date()
        var result: [(ReminderKind, Date)] = []

        if let evening18 = dayBeforeDate(for: event.date, hour: 18), evening18 > now {
            result.append((.eveningBefore18, evening18))
        }
        if let evening21 = dayBeforeDate(for: event.date, hour: 21), evening21 > now {
            result.append((.eveningBefore21, evening21))
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

    private static func dayBeforeDate(for eventDate: Date, hour: Int) -> Date? {
        guard let dayBefore = calendar.date(byAdding: .day, value: -1, to: startOfDay(for: eventDate)) else {
            return nil
        }
        return calendar.date(bySettingHour: hour, minute: 0, second: 0, of: dayBefore)
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
        case .eveningBefore18, .eveningBefore21:
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
