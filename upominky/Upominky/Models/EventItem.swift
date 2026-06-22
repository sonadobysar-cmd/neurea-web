import Foundation
import SwiftData

@Model
final class EventItem {
    var id: UUID
    var title: String
    var date: Date
    var createdAt: Date

    init(title: String, date: Date) {
        self.id = UUID()
        self.title = title.trimmingCharacters(in: .whitespacesAndNewlines)
        self.date = date
        self.createdAt = Date()
    }
}
