import Foundation
import SwiftData

enum CategorySeed {
    private static let defaults: [(String, String)] = [
        ("Práce", "#A8B8F5"),
        ("Lékaři já", "#9DDFC4"),
        ("Lékaři děti", "#FFCBA4"),
        ("Rodinné akce", "#FFE08A"),
        ("Superdůležité", "#FF9EB8"),
    ]

    @MainActor
    static func seedIfNeeded(context: ModelContext) {
        let descriptor = FetchDescriptor<CategoryTag>()
        let existing = (try? context.fetch(descriptor)) ?? []
        let existingNames = Set(existing.map(\.name))

        for (index, item) in defaults.enumerated() where !existingNames.contains(item.0) {
            let tag = CategoryTag(
                name: item.0,
                colorHex: item.1,
                isSystem: true,
                sortOrder: index
            )
            context.insert(tag)
        }
        try? context.save()
    }
}
