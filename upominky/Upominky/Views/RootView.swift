import SwiftUI
import SwiftData

struct RootView: View {
    @Environment(\.modelContext) private var modelContext
    @State private var isReady = false

    var body: some View {
        ZStack {
            AppTheme.background.ignoresSafeArea()

            if isReady {
                ContentView()
            } else {
                VStack(spacing: 16) {
                    ProgressView()
                        .tint(AppTheme.accent)
                    Text("Načítám tvoje plány…")
                        .font(.headline)
                        .foregroundStyle(AppTheme.text)
                }
            }
        }
        .task {
            CategorySeed.seedIfNeeded(context: modelContext)
            DataRepair.normalize(context: modelContext)
            if UserDefaults.standard.bool(forKey: "hasCompletedWelcome") {
                _ = await ReminderScheduler.requestPermission()
                await WeeklyUpdateReminder.scheduleIfNeeded()
            }
            isReady = true
        }
    }
}

struct RecoveryNoticeView: View {
    var body: some View {
        Text("Appka se obnovila z poškozených dat — plány mohou chybět. Záloha je v telefonu.")
            .font(.caption)
            .foregroundStyle(.orange)
            .padding(.horizontal)
            .padding(.top, 8)
    }
}
