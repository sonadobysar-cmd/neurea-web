import SwiftUI
import SwiftData

@main
struct UpominkyApp: App {
    init() {
        AppAppearance.configure()
        _ = UpominkyStore.sharedContainer
    }

    var body: some Scene {
        WindowGroup {
            RootView()
        }
        .modelContainer(UpominkyStore.sharedContainer)
    }
}
