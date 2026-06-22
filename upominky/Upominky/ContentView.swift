import SwiftUI

struct ContentView: View {
    @AppStorage("hasCompletedWelcome") private var hasCompletedWelcome = false

    var body: some View {
        Group {
            if hasCompletedWelcome {
                EventListView()
            } else {
                WelcomeView()
            }
        }
        .task {
            if hasCompletedWelcome {
                _ = await ReminderScheduler.requestPermission()
            }
        }
    }
}

#Preview {
    ContentView()
        .modelContainer(for: EventItem.self, inMemory: true)
}
