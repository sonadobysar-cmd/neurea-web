import SwiftUI
import SwiftData

private let appSchema = Schema([EventItem.self, CategoryTag.self])

private let appModelContainer: ModelContainer = {
    let configuration = ModelConfiguration(
        schema: appSchema,
        cloudKitDatabase: .automatic
    )
    do {
        return try ModelContainer(for: appSchema, configurations: [configuration])
    } catch {
        fatalError("Nepodařilo se vytvořit databázi: \(error)")
    }
}()

@main
struct UpominkyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(appModelContainer)
    }
}
