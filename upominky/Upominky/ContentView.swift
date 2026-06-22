import SwiftUI

struct ContentView: View {
    var body: some View {
        EventListView()
            .task {
                _ = await ReminderScheduler.requestPermission()
            }
    }
}

#Preview {
    ContentView()
        .modelContainer(for: EventItem.self, inMemory: true)
}
