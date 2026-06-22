import Foundation
import SwiftData

// MARK: - Schéma V1 (původní appka bez kategorií)

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

// MARK: - Aktuální schéma (V2) — jen jedna verze s dnešními modely

enum UpominkySchemaV2: VersionedSchema {
    static var versionIdentifier = Schema.Version(2, 0, 0)

    static var models: [any PersistentModel.Type] {
        [EventItem.self, CategoryTag.self]
    }
}

enum UpominkyMigrationPlan: SchemaMigrationPlan {
    static var schemas: [any VersionedSchema.Type] {
        [UpominkySchemaV1.self, UpominkySchemaV2.self]
    }

    static var stages: [MigrationStage] {
        [MigrationStage.lightweight(fromVersion: UpominkySchemaV1.self, toVersion: UpominkySchemaV2.self)]
    }
}

// MARK: - Otevření databáze

enum UpominkyStore {
    private static let storeFileName = "Upominky.store"

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

        let configuration = ModelConfiguration(url: url, allowsSave: true)

        // 1. Bez migračního plánu — nejbezpečnější, nehází NSException
        if let container = tryOpen(configuration: configuration, withMigration: false) {
            UserDefaults.standard.set(false, forKey: "upominky.storeRecovered")
            return container
        }

        // 2. Migrace jen V1 → V2 (staré instalace bez kategorií)
        if let container = tryOpen(configuration: configuration, withMigration: true) {
            UserDefaults.standard.set(false, forKey: "upominky.storeRecovered")
            return container
        }

        // 3. Záloha poškozeného souboru a nový start
        backupExistingStoreFiles(at: url)
        removeStoreFiles(at: url)

        if let container = tryOpen(configuration: configuration, withMigration: false) {
            UserDefaults.standard.set(true, forKey: "upominky.storeRecovered")
            NSLog("UpominkyStore: databáze obnovena ze zálohy")
            return container
        }

        UserDefaults.standard.set(true, forKey: "upominky.storeRecovered")
        return inMemoryContainer()
    }

    private static func tryOpen(
        configuration: ModelConfiguration,
        withMigration: Bool
    ) -> ModelContainer? {
        do {
            if withMigration {
                return try ModelContainer(
                    for: EventItem.self, CategoryTag.self,
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
