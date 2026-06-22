import Foundation
import SwiftData

@Model
final class EventItem {
    var id: UUID
    var title: String
    var date: Date
    var categoryId: UUID?
    var createdAt: Date
    /// Externí reference (např. nia:NIA-20260623-1234) pro sync z webu
    var externalRef: String?

    init(title: String, date: Date, categoryId: UUID? = nil, externalRef: String? = nil) {
        self.id = UUID()
        self.title = title.trimmingCharacters(in: .whitespacesAndNewlines)
        self.date = date
        self.categoryId = categoryId
        self.createdAt = Date()
        self.externalRef = externalRef
    }
}
