import SwiftUI
import SwiftData

struct AddEventView: View {
    @Environment(\.dismiss) private var dismiss
    @Environment(\.modelContext) private var modelContext

    @State private var title = ""
    @State private var date = defaultEventDate()
    @State private var notificationsDenied = false
    @State private var isSaving = false

    var body: some View {
        NavigationStack {
            Form {
                Section {
                    TextField("Co máš v plánu?", text: $title)
                        .textInputAutocapitalization(.sentences)

                    DatePicker(
                        "Kdy",
                        selection: $date,
                        in: Date()...,
                        displayedComponents: [.date, .hourAndMinute]
                    )
                    .environment(\.locale, Locale(identifier: "cs_CZ"))
                }

                Section {
                    Label("Večer předem v 18:00", systemImage: "moon.stars")
                    Label("Ráno v den D v 8:00", systemImage: "sunrise")
                    Label("1 hodinu před termínem", systemImage: "bell")
                } header: {
                    Text("Automatické připomínky")
                } footer: {
                    Text("Nemusíš nic nastavovat — po uložení ti přijdou notifikace samy, jako po rezervaci.")
                }

                if notificationsDenied {
                    Section {
                        Text("Notifikace jsou vypnuté. Zapni je v Nastavení systému → Upomínky → Oznámení.")
                            .foregroundStyle(.orange)
                    }
                }
            }
            .navigationTitle("Nový plán")
            #if os(iOS)
            .navigationBarTitleDisplayMode(.inline)
            #endif
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Zrušit") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Uložit") { save() }
                        .disabled(title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty || isSaving)
                }
            }
        }
    }

    private func save() {
        isSaving = true
        let event = EventItem(title: title, date: date)
        modelContext.insert(event)

        Task {
            let allowed = await ReminderScheduler.requestPermission()
            if allowed {
                await ReminderScheduler.schedule(for: event)
            } else {
                notificationsDenied = true
                isSaving = false
                return
            }
            await MainActor.run { dismiss() }
        }
    }

    private static func defaultEventDate() -> Date {
        let calendar = Calendar.current
        let tomorrow = calendar.date(byAdding: .day, value: 1, to: Date()) ?? Date()
        return calendar.date(bySettingHour: 10, minute: 0, second: 0, of: tomorrow) ?? tomorrow
    }
}
