import SwiftUI
import SwiftData

struct EventFormView: View {
    @Environment(\.dismiss) private var dismiss
    @Environment(\.modelContext) private var modelContext
    @Query(sort: [SortDescriptor(\CategoryTag.sortOrder), SortDescriptor(\CategoryTag.name)])
    private var categories: [CategoryTag]

    var eventToEdit: EventItem?

    @State private var title = ""
    @State private var date = defaultEventDate()
    @State private var selectedCategoryId: UUID?
    @State private var notificationsDenied = false
    @State private var isSaving = false
    @State private var didLoadExisting = false

    private var isEditing: Bool { eventToEdit != nil }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Co máš v plánu?")
                            .font(.subheadline.weight(.semibold))
                            .foregroundStyle(AppTheme.text)
                        TextField("Např. kontrola u zubaře", text: $title)
                            .textInputAutocapitalization(.sentences)
                            .padding(14)
                            .background(AppTheme.card, in: RoundedRectangle(cornerRadius: 12))
                            .foregroundStyle(AppTheme.text)
                    }

                    VStack(alignment: .leading, spacing: 8) {
                        Text("Kdy")
                            .font(.subheadline.weight(.semibold))
                            .foregroundStyle(AppTheme.text)
                        DatePicker(
                            "",
                            selection: $date,
                            in: Date()...,
                            displayedComponents: [.date, .hourAndMinute]
                        )
                        .datePickerStyle(.graphical)
                        .environment(\.locale, Locale(identifier: "cs_CZ"))
                        .padding(12)
                        .background(AppTheme.card, in: RoundedRectangle(cornerRadius: 12))
                        .colorScheme(.light)
                    }

                    VStack(alignment: .leading, spacing: 10) {
                        Text("Štítek")
                            .font(.subheadline.weight(.semibold))
                            .foregroundStyle(AppTheme.text)
                        if categories.isEmpty {
                            Text("Načítám štítky…")
                                .foregroundStyle(AppTheme.textMuted)
                        } else {
                            CategoryRibbonPicker(
                                categories: categories,
                                selectedId: $selectedCategoryId
                            )
                        }
                    }

                    VStack(alignment: .leading, spacing: 10) {
                        Text("Automatické připomínky")
                            .font(.subheadline.weight(.semibold))
                            .foregroundStyle(AppTheme.text)
                        VStack(alignment: .leading, spacing: 8) {
                            reminderRow(icon: "moon.stars", text: "Večer předem v 18:00")
                            reminderRow(icon: "moon.fill", text: "Večer předem v 21:00")
                            reminderRow(icon: "sunrise", text: "Ráno v den D v 8:00")
                            reminderRow(icon: "bell", text: "1 hodinu před termínem")
                        }
                        .padding(14)
                        .background(AppTheme.accentSoft, in: RoundedRectangle(cornerRadius: 12))
                        Text("Nemusíš nic nastavovat — po uložení ti přijdou notifikace samy.")
                            .font(.caption)
                            .foregroundStyle(AppTheme.textMuted)
                    }

                    if notificationsDenied {
                        Text("Notifikace jsou vypnuté. Zapni je v Nastavení → Upomínky → Oznámení.")
                            .font(.caption)
                            .foregroundStyle(.orange)
                    }
                }
                .padding()
            }
            .pinkScreen()
            .pinkNavigationBar()
            .navigationTitle(isEditing ? "Upravit plán" : "Nový plán")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Zrušit") { dismiss() }
                        .foregroundStyle(AppTheme.text)
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Uložit") { save() }
                        .fontWeight(.semibold)
                        .foregroundStyle(AppTheme.accent)
                        .disabled(title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty || isSaving)
                }
            }
            .onAppear { loadExistingIfNeeded() }
            .onChange(of: categories.count) { _, _ in
                if selectedCategoryId == nil {
                    selectedCategoryId = categories.first?.id
                }
            }
        }
    }

    private func loadExistingIfNeeded() {
        guard !didLoadExisting else { return }
        didLoadExisting = true

        if let event = eventToEdit {
            title = event.title
            date = event.date
            selectedCategoryId = event.categoryId ?? categories.first?.id
        } else if selectedCategoryId == nil {
            selectedCategoryId = categories.first?.id
        }
    }

    private func reminderRow(icon: String, text: String) -> some View {
        Label(text, systemImage: icon)
            .font(.subheadline)
            .foregroundStyle(AppTheme.text)
    }

    private func save() {
        isSaving = true
        let trimmed = title.trimmingCharacters(in: .whitespacesAndNewlines)

        Task {
            let allowed = await ReminderScheduler.requestPermission()
            guard allowed else {
                notificationsDenied = true
                isSaving = false
                return
            }

            if let event = eventToEdit {
                event.title = trimmed
                event.date = date
                event.categoryId = selectedCategoryId
                await ReminderScheduler.reschedule(for: event)
            } else {
                let event = EventItem(title: trimmed, date: date, categoryId: selectedCategoryId)
                modelContext.insert(event)
                await ReminderScheduler.schedule(for: event)
            }

            try? modelContext.save()
            await MainActor.run { dismiss() }
        }
    }

    private static func defaultEventDate() -> Date {
        let calendar = Calendar.current
        let tomorrow = calendar.date(byAdding: .day, value: 1, to: Date()) ?? Date()
        return calendar.date(bySettingHour: 10, minute: 0, second: 0, of: tomorrow) ?? tomorrow
    }
}

// Zachováno pro starší odkazy v projektu
typealias AddEventView = EventFormView
