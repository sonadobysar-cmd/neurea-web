import Foundation
import UserNotifications

/// Každou neděli ve 22:00 — nutnost obnovit appku přes Xcode (platnost ~7 dní).
enum WeeklyUpdateReminder {
    static let notificationID = "upominky.weekly-xcode-update"
    private static let prague = Calendar(identifier: .gregorian)

    static func scheduleIfNeeded() async {
        let center = UNUserNotificationCenter.current()
        center.removePendingNotificationRequests(withIdentifiers: [notificationID])

        var components = DateComponents()
        components.calendar = prague
        components.timeZone = TimeZone(identifier: "Europe/Prague")
        components.weekday = 1 // neděle
        components.hour = 22
        components.minute = 0

        let content = UNMutableNotificationContent()
        content.title = "Upomínky — nutná aktualizace"
        content.body = "Připoj iPhone k Macu a v Xcode dej ▶ Play. Bez toho appka za pár dní přestane jít."
        content.sound = .default
        if #available(iOS 15.0, *) {
            content.interruptionLevel = .timeSensitive
        }

        let trigger = UNCalendarNotificationTrigger(dateMatching: components, repeats: true)
        let request = UNNotificationRequest(
            identifier: notificationID,
            content: content,
            trigger: trigger
        )
        try? await center.add(request)
    }

    /// Celá neděle — v appce se zobrazí neodstranitelný banner.
    static var isSunday: Bool {
        var calendar = prague
        calendar.timeZone = TimeZone(identifier: "Europe/Prague") ?? .current
        return calendar.component(.weekday, from: Date()) == 1
    }
}
