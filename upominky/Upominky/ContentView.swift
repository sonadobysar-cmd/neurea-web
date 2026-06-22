import SwiftUI
import SwiftData

struct ContentView: View {
    @AppStorage("hasCompletedWelcome") private var hasCompletedWelcome = false
    @Environment(\.modelContext) private var modelContext

    var body: some View {
        Group {
            if hasCompletedWelcome {
                EventListView()
            } else {
                WelcomeView()
            }
        }
        .tint(AppTheme.accent)
        .task {
            CategorySeed.seedIfNeeded(context: modelContext)
            if hasCompletedWelcome {
                _ = await ReminderScheduler.requestPermission()
            }
        }
    }
}

#Preview {
    ContentView()
        .modelContainer(for: [EventItem.self, CategoryTag.self], inMemory: true)
}
