import Foundation

/// Rezervace z webu, které uživatel v appce smazal — sync je znovu nepřidá.
enum NiaSyncDismissedStore {
    private static let key = "upominky.niaDismissedRefs"

    static func isDismissed(ref: String) -> Bool {
        refs.contains(ref)
    }

    static func dismiss(ref: String) {
        guard ref.hasPrefix("nia:") else { return }
        var next = refs
        next.insert(ref)
        save(next)
    }

    static func dismiss(_ event: EventItem) {
        guard let ref = event.externalRef else { return }
        dismiss(ref: ref)
    }

    private static var refs: Set<String> {
        Set(UserDefaults.standard.stringArray(forKey: key) ?? [])
    }

    private static func save(_ refs: Set<String>) {
        UserDefaults.standard.set(Array(refs), forKey: key)
    }
}
