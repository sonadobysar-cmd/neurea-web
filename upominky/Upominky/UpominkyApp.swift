import SwiftUI
import SwiftData

@main
struct UpominkyApp: App {
    init() {
        AppAppearance.configure()
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
                .background(AppTheme.background.ignoresSafeArea())
        }
        .modelContainer(UpominkyStore.container)
    }
}
