import SwiftUI
import SwiftData

struct ContentView: View {
    @AppStorage("hasCompletedWelcome") private var hasCompletedWelcome = false
    @Environment(\.modelContext) private var modelContext
    @Environment(\.scenePhase) private var scenePhase

    var body: some View {
        Group {
            if hasCompletedWelcome {
                EventListView()
            } else {
                WelcomeView()
            }
        }
        .tint(AppTheme.accent)
        .onChange(of: scenePhase) { _, phase in
            guard phase == .active, hasCompletedWelcome else { return }
            Task(priority: .utility) {
                try? await Task.sleep(for: .seconds(2))
                await NiaKonzultaceSync.syncIfConfigured(context: modelContext)
            }
        }
    }
}

#Preview {
    ContentView()
        .modelContainer(for: [EventItem.self, CategoryTag.self], inMemory: true)
}
