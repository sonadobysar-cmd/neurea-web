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

enum UpominkySchemaV5: VersionedSchema {
    static var versionIdentifier = Schema.Version(5, 0, 0)

    static var models: [any PersistentModel.Type] {
        [EventItem.self, CategoryTag.self]
    }
}

enum UpominkyMigrationPlan: SchemaMigrationPlan {
    static var schemas: [any VersionedSchema.Type] {
        [
            UpominkySchemaV1.self,
            UpominkySchemaV2.self,
            UpominkySchemaV3.self,
            UpominkySchemaV4.self,
            UpominkySchemaV5.self,
        ]
    }

    static var stages: [MigrationStage] {
        [
            MigrationStage.lightweight(fromVersion: UpominkySchemaV1.self, toVersion: UpominkySchemaV2.self),
            MigrationStage.lightweight(fromVersion: UpominkySchemaV2.self, toVersion: UpominkySchemaV3.self),
            MigrationStage.lightweight(fromVersion: UpominkySchemaV3.self, toVersion: UpominkySchemaV4.self),
            MigrationStage.lightweight(fromVersion: UpominkySchemaV4.self, toVersion: UpominkySchemaV5.self),
        ]
    }
}

enum UpominkyStore {
    private static let storeFileName = "Upominky.store"

    /// Načte databázi při startu — vždy vrátí funkční kontejner (záloha + nový soubor jen když jinak nejde).
    static let sharedContainer: ModelContainer = openWithRecovery()

    static var storeURL: URL {
        let supportDir = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask).first!
        let appDir = supportDir.appending(path: "Upominky", directoryHint: .isDirectory)
        return appDir.appending(path: storeFileName)
    }

    static var didRecoverFromCorruption: Bool {
        UserDefaults.standard.bool(forKey: "upominky.storeRecovered")
    }

    private static func openWithRecovery() -> ModelContainer {
        let url = storeURL
        try? FileManager.default.createDirectory(
            at: url.deletingLastPathComponent(),
            withIntermediateDirectories: true
        )

        let schema = Schema(versionedSchema: UpominkySchemaV5.self)
        let configuration = ModelConfiguration(schema: schema, url: url, allowsSave: true)

        if let container = tryOpen(schema: schema, configuration: configuration, withMigration: true) {
            UserDefaults.standard.set(false, forKey: "upominky.storeRecovered")
            return container
        }

        if let container = tryOpen(schema: schema, configuration: configuration, withMigration: false) {
            UserDefaults.standard.set(false, forKey: "upominky.storeRecovered")
            return container
        }

        backupExistingStoreFiles(at: url)
        removeStoreFiles(at: url)

        if let container = tryOpen(schema: schema, configuration: configuration, withMigration: true) {
            UserDefaults.standard.set(true, forKey: "upominky.storeRecovered")
            NSLog("UpominkyStore: obnoveno z poškozené databáze — záloha uložena")
            return container
        }

        UserDefaults.standard.set(true, forKey: "upominky.storeRecovered")
        return inMemoryContainer()
    }

    private static func tryOpen(
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

    private static func inMemoryContainer() -> ModelContainer {
        do {
            return try ModelContainer(
                for: EventItem.self, CategoryTag.self,
                configurations: ModelConfiguration(isStoredInMemoryOnly: true)
            )
        } catch {
            fatalError("Upomínky: kritická chyba — nelze vytvořit databázi. \(error.localizedDescription)")
        }
    }

    private static func storeFileURLs(at url: URL) -> [URL] {
        let dir = url.deletingLastPathComponent()
        let names = [
            url.lastPathComponent,
            "\(url.lastPathComponent)-wal",
            "\(url.lastPathComponent)-shm",
        ]
        return names.map { dir.appending(path: $0) }
    }

    private static func backupExistingStoreFiles(at url: URL) {
        let backupDir = url.deletingLastPathComponent().appending(path: "Backups", directoryHint: .isDirectory)
        try? FileManager.default.createDirectory(at: backupDir, withIntermediateDirectories: true)

        let stamp = ISO8601DateFormatter().string(from: Date())
            .replacingOccurrences(of: ":", with: "-")
        let folder = backupDir.appending(path: "backup-\(stamp)", directoryHint: .isDirectory)
        try? FileManager.default.createDirectory(at: folder, withIntermediateDirectories: true)

        for file in storeFileURLs(at: url) where FileManager.default.fileExists(atPath: file.path) {
            let dest = folder.appending(path: file.lastPathComponent)
            try? FileManager.default.copyItem(at: file, to: dest)
        }
    }

    private static func removeStoreFiles(at url: URL) {
        for file in storeFileURLs(at: url) {
            try? FileManager.default.removeItem(at: file)
        }
    }
}
