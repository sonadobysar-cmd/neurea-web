import SwiftUI
import SwiftData

@main
struct UpominkyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(for: [EventItem.self, CategoryTag.self])
    }
}
