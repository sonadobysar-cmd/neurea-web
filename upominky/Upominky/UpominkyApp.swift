import SwiftUI
import SwiftData

@main
struct UpominkyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(UpominkyStore.container)
    }
}
