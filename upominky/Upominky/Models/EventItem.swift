import Foundation
import SwiftData

@Model
final class EventItem {
    var id: UUID
    var title: String
    var date: Date
    var categoryId: UUID?
    var createdAt: Date

    init(title: String, date: Date, categoryId: UUID? = nil) {
        self.id = UUID()
        self.title = title.trimmingCharacters(in: .whitespacesAndNewlines)
        self.date = date
        self.categoryId = categoryId
        self.createdAt = Date()
    }
}
