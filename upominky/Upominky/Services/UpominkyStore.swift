import Foundation
import SwiftData

// Starší verze schématu — data zůstávají při upgradu appky.
enum UpominkySchemaV1: VersionedSchema {
    static var versionIdentifier = Schema.Version(1, 0, 0)

    static var models: [any PersistentModel.Type] {
        [EventItemV1.self]
    }

    @Model
    final class EventItemV1 {
        var id: UUID
        var title: String
        var date: Date
        var createdAt: Date

        init(id: UUID = UUID(), title: String, date: Date, createdAt: Date = Date()) {
            self.id = id
            self.title = title
            self.date = date
            self.createdAt = createdAt
        }
    }
}

enum UpominkySchemaV2: VersionedSchema {
    static var versionIdentifier = Schema.Version(2, 0, 0)

    static var models: [any PersistentModel.Type] {
        [EventItem.self, CategoryTag.self]
    }
}

enum UpominkySchemaV3: VersionedSchema {
    static var versionIdentifier = Schema.Version(3, 0, 0)

    static var models: [any PersistentModel.Type] {
        [EventItem.self, CategoryTag.self]
    }
}

enum UpominkySchemaV4: VersionedSchema {
    static var versionIdentifier = Schema.Version(4, 0, 0)

    static var models: [any PersistentModel.Type] {
        [EventItem.self, CategoryTag.self]
    }
}

enum UpominkyMigrationPlan: SchemaMigrationPlan {
    static var schemas: [any VersionedSchema.Type] {
        [UpominkySchemaV1.self, UpominkySchemaV2.self, UpominkySchemaV3.self, UpominkySchemaV4.self]
    }

    static var stages: [MigrationStage] {
        [
            MigrationStage.lightweight(fromVersion: UpominkySchemaV1.self, toVersion: UpominkySchemaV2.self),
            MigrationStage.lightweight(fromVersion: UpominkySchemaV2.self, toVersion: UpominkySchemaV3.self),
            MigrationStage.lightweight(fromVersion: UpominkySchemaV3.self, toVersion: UpominkySchemaV4.self),
        ]
    }
}

enum UpominkyStore {
    private static let storeFileName = "Upominky.store"

    static var storeURL: URL {
        let supportDir = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask).first!
        let appDir = supportDir.appending(path: "Upominky", directoryHint: .isDirectory)
        return appDir.appending(path: storeFileName)
    }

    static func makeContainer() -> Result<ModelContainer, Error> {
        let url = storeURL
        try? FileManager.default.createDirectory(
            at: url.deletingLastPathComponent(),
            withIntermediateDirectories: true
        )

        let schema = Schema(versionedSchema: UpominkySchemaV4.self)
        let configuration = ModelConfiguration(
            schema: schema,
            url: url,
            allowsSave: true
        )

        if let container = openContainer(schema: schema, configuration: configuration, withMigration: true) {
            return .success(container)
        }

        if let container = openContainer(schema: schema, configuration: configuration, withMigration: false) {
            return .success(container)
        }

        return .failure(
            StoreError.unreadableStore(
                "Nepodařilo se načíst uložené plány. Zkus appku znovu spustit z Xcode (▶), appku z plochy nemaž."
            )
        )
    }

    private static func openContainer(
        schema: Schema,
        configuration: ModelConfiguration,
        withMigration: Bool
    ) -> ModelContainer? {
        do {
            if withMigration {
                return try ModelContainer(
                    for: schema,
                    migrationPlan: UpominkyMigrationPlan.self,
                    configurations: configuration
                )
            }
            return try ModelContainer(
                for: EventItem.self, CategoryTag.self,
                configurations: configuration
            )
        } catch {
            NSLog("UpominkyStore load failed (migration=\(withMigration)): \(error.localizedDescription)")
            return nil
        }
    }
}

enum StoreError: LocalizedError {
    case unreadableStore(String)

    var errorDescription: String? {
        switch self {
        case .unreadableStore(let message):
            return message
        }
    }
}
