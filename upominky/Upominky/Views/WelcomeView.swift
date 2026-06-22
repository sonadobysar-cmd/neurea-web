import SwiftUI

struct WelcomeView: View {
    @AppStorage("hasCompletedWelcome") private var hasCompletedWelcome = false
    @State private var step = 0

    var body: some View {
        VStack(spacing: 28) {
            Spacer()

            Image(systemName: "bell.badge.fill")
                .font(.system(size: 56))
                .foregroundStyle(.tint)

            VStack(spacing: 12) {
                Text("Upomínky")
                    .font(.largeTitle.bold())

                Text("Zadáš co a kdy — připomínky přijdou samy.\nJako SMS po rezervaci, jen jako notifikace.")
                    .multilineTextAlignment(.center)
                    .foregroundStyle(.secondary)
                    .padding(.horizontal)
            }

            VStack(alignment: .leading, spacing: 14) {
                welcomeRow(icon: "moon.stars", text: "Večer předem v 18:00")
                welcomeRow(icon: "sunrise", text: "Ráno v den D v 8:00")
                welcomeRow(icon: "bell", text: "1 hodinu před termínem")
            }
            .padding()
            .background(.quaternary.opacity(0.5), in: RoundedRectangle(cornerRadius: 12))
            .padding(.horizontal)

            Spacer()

            Button {
                if step == 0 {
                    step = 1
                    Task { _ = await ReminderScheduler.requestPermission() }
                } else {
                    hasCompletedWelcome = true
                }
            } label: {
                Text(step == 0 ? "Pokračovat" : "Začít používat")
                    .frame(maxWidth: .infinity)
            }
            .buttonStyle(.borderedProminent)
            .padding(.horizontal)
            .padding(.bottom, 32)
        }
        .overlay(alignment: .top) {
            if step == 1 {
                Text("Když se systém zeptá na notifikace, klepni Povolit.")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .padding(.top, 16)
            }
        }
    }

    private func welcomeRow(icon: String, text: String) -> some View {
        Label(text, systemImage: icon)
            .font(.subheadline)
    }
}
