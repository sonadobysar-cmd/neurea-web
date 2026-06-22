import SwiftUI

struct WelcomeView: View {
    @AppStorage("hasCompletedWelcome") private var hasCompletedWelcome = false
    @State private var step = 0

    var body: some View {
        VStack(spacing: 28) {
            Spacer()

            Image(systemName: "bell.badge.fill")
                .font(.system(size: 56))
                .foregroundStyle(AppTheme.accent)

            VStack(spacing: 12) {
                Text("Upomínky")
                    .font(.largeTitle.bold())
                    .foregroundStyle(AppTheme.text)

                Text("Zadáš co a kdy — připomínky přijdou samy.\nJako SMS po rezervaci, jen jako notifikace.")
                    .multilineTextAlignment(.center)
                    .foregroundStyle(AppTheme.textMuted)
                    .padding(.horizontal)
            }

            VStack(alignment: .leading, spacing: 14) {
                welcomeRow(icon: "moon.stars", text: "Večer předem v 18:00")
                welcomeRow(icon: "moon.fill", text: "Večer předem v 21:00")
                welcomeRow(icon: "sunrise", text: "Ráno v den D v 8:00")
                welcomeRow(icon: "bell", text: "1 hodinu před termínem")
            }
            .padding()
            .background(AppTheme.card, in: RoundedRectangle(cornerRadius: 16))
            .padding(.horizontal)

            Spacer()

            Button {
                if step == 0 {
                    step = 1
                    Task { _ = await ReminderScheduler.requestPermission() }
                } else {
                    hasCompletedWelcome = true
                    Task {
                        _ = await ReminderScheduler.requestPermission()
                        await WeeklyUpdateReminder.scheduleIfNeeded()
                    }
                }
            } label: {
                Text(step == 0 ? "Pokračovat" : "Začít používat")
                    .fontWeight(.semibold)
                    .frame(maxWidth: .infinity)
            }
            .buttonStyle(.borderedProminent)
            .tint(AppTheme.accent)
            .padding(.horizontal)
            .padding(.bottom, 32)
        }
        .pinkScreen()
        .overlay(alignment: .top) {
            if step == 1 {
                Text("Když se systém zeptá na notifikace, klepni Povolit.")
                    .font(.caption)
                    .foregroundStyle(AppTheme.textMuted)
                    .padding(.top, 16)
            }
        }
    }

    private func welcomeRow(icon: String, text: String) -> some View {
        Label(text, systemImage: icon)
            .font(.subheadline)
            .foregroundStyle(AppTheme.text)
    }
}
