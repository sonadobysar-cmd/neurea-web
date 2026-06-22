import Foundation
import SwiftData

enum CategorySeed {
    private static let defaults: [(String, String)] = [
        ("Práce", "#C5CAF9"),
        ("Lékaři já", "#B8E8D8"),
        ("Lékaři děti", "#FFD4B8"),
        ("Rodinné akce", "#FFF0B3"),
        ("Superdůležité", "#FFB8C8"),
    ]

    @MainActor
    static func seedIfNeeded(context: ModelContext) {
        let descriptor = FetchDescriptor<CategoryTag>()
        guard let existing = try? context.fetch(descriptor), existing.isEmpty else { return }

        for (index, item) in defaults.enumerated() {
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
