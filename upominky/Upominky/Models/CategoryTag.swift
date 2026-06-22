import Foundation
import SwiftData

@Model
final class CategoryTag {
    var id: UUID
    var name: String
    var colorHex: String
    var isSystem: Bool
    var sortOrder: Int
    var createdAt: Date

    init(name: String, colorHex: String, isSystem: Bool = false, sortOrder: Int = 0) {
        self.id = UUID()
        self.name = name.trimmingCharacters(in: .whitespacesAndNewlines)
        self.colorHex = colorHex
        self.isSystem = isSystem
        self.sortOrder = sortOrder
        self.createdAt = Date()
    }
}
