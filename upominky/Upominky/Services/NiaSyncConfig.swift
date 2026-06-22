import Foundation

enum NiaSyncConfig {
    /// API webu niadobysar.com
    static let apiBaseURL = URL(string: "https://niadobysar.com")!

    /// Stejný token jako UPOMINKY_SYNC_SECRET na Vercelu.
    /// Vyplň v Xcode — bez tokenu se sync přeskočí.
    static let syncToken = ""

    static var isConfigured: Bool {
        !syncToken.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }
}
