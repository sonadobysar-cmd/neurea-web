import Foundation

enum NiaSyncConfig {
    /// API webu niadobysar.com
    static let apiBaseURL = URL(string: "https://www.niadobysar.com")!

    /// Stejný token jako UPOMINKY_SYNC_SECRET na Vercelu.
    /// Vyplň v Xcode — bez tokenu se sync přeskočí.
    static let syncToken = "484c09ea0a17fec19bd5376b2247ef330ec16b26a6195a7c490af3efb05ab3f3"

    static var isConfigured: Bool {
        !syncToken.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }
}
