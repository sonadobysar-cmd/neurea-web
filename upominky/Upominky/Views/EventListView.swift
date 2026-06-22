import SwiftUI
import SwiftData

struct EventListView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \EventItem.date) private var events: [EventItem]
    @Query(sort: [SortDescriptor(\CategoryTag.sortOrder), SortDescriptor(\CategoryTag.name)])
    private var categories: [CategoryTag]

    @State private var showAddSheet = false
    @State private var showManageCategories = false
    @State private var eventToEdit: EventItem?
    @State private var filterCategoryId: UUID?

    private var upcoming: [EventItem] {
        filtered(events.filter { $0.date >= Date() })
    }

    private var past: [EventItem] {
        Array(filtered(events.filter { $0.date < Date() }).reversed())
    }

    var body: some View {
        NavigationStack {
            Group {
                if events.isEmpty {
                    emptyState
                } else {
                    ScrollView {
                        VStack(alignment: .leading, spacing: 16) {
                            filterBar

                            if !upcoming.isEmpty {
                                sectionHeader("Nadcházející")
                                ForEach(upcoming) { event in
                                    eventCard(event)
                                }
                            }

                            if !past.isEmpty {
                                sectionHeader("Proběhlé")
                                ForEach(past) { event in
                                    eventCard(event, isPast: true)
                                }
                            }
                        }
                        .padding()
                    }
                }
            }
            .pinkScreen()
            .navigationTitle("Upomínky")
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    tagToolbarButton
                }
                ToolbarItem(placement: .primaryAction) {
                    Button {
                        showAddSheet = true
                    } label: {
                        Image(systemName: "plus.circle.fill")
                            .font(.title2)
                            .foregroundStyle(AppTheme.accent)
                    }
                    .accessibilityLabel("Přidat plán")
                }
            }
            .sheet(isPresented: $showAddSheet) {
                EventFormView()
            }
            .sheet(item: $eventToEdit) { event in
                EventFormView(eventToEdit: event)
            }
            .sheet(isPresented: $showManageCategories) {
                ManageCategoriesView()
            }
        }
    }

    private var tagToolbarButton: some View {
        Button {
            showManageCategories = true
        } label: {
            Image(systemName: "tag")
        }
        .foregroundStyle(AppTheme.text)
        .accessibilityLabel("Spravovat štítky")
    }

    private var emptyState: some View {
        VStack(spacing: 20) {
            Spacer()
            Image(systemName: "calendar.badge.plus")
                .font(.system(size: 48))
                .foregroundStyle(AppTheme.accent)
            Text("Zatím nic v plánu")
                .font(.title2.bold())
                .foregroundStyle(AppTheme.text)
            Text("Přidej termín — připomínky nastavíme za tebe.")
                .multilineTextAlignment(.center)
                .foregroundStyle(AppTheme.textMuted)
                .padding(.horizontal)
            Button("Přidat plán") { showAddSheet = true }
                .buttonStyle(.borderedProminent)
                .tint(AppTheme.accent)
            Spacer()
        }
        .padding()
    }

    private var filterBar: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                filterChip(name: "Vše", colorHex: "#FFE4EE", isActive: filterCategoryId == nil) {
                    filterCategoryId = nil
                }
                ForEach(categories, id: \.id) { category in
                    filterChip(
                        name: category.name,
                        colorHex: category.colorHex,
                        isActive: filterCategoryId == category.id
                    ) {
                        filterCategoryId = category.id
                    }
                }
            }
        }
    }

    private func filterChip(
        name: String,
        colorHex: String,
        isActive: Bool,
        action: @escaping () -> Void
    ) -> some View {
        Button(action: action) {
            CategoryRibbonView(
                name: name,
                colorHex: colorHex,
                isSelected: isActive,
                compact: true
            )
        }
        .buttonStyle(.plain)
    }

    private func sectionHeader(_ title: String) -> some View {
        Text(title)
            .font(.headline)
            .foregroundStyle(AppTheme.text)
            .padding(.top, 4)
    }

    private func eventCard(_ event: EventItem, isPast: Bool = false) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                if let category = category(for: event) {
                    CategoryRibbonView(
                        name: category.name,
                        colorHex: category.colorHex,
                        compact: true
                    )
                }
                Spacer()
                if !isPast {
                    HStack(spacing: 16) {
                        Button {
                            eventToEdit = event
                        } label: {
                            Image(systemName: "pencil")
                                .font(.caption)
                                .foregroundStyle(AppTheme.accent)
                        }
                        .buttonStyle(.plain)
                        .accessibilityLabel("Upravit plán")

                        Button(role: .destructive) {
                            deleteEvent(event)
                        } label: {
                            Image(systemName: "trash")
                                .font(.caption)
                                .foregroundStyle(AppTheme.textMuted)
                        }
                        .buttonStyle(.plain)
                    }
                }
            }

            Text(event.title)
                .font(.headline)
                .foregroundStyle(isPast ? AppTheme.textMuted : AppTheme.text)

            Text(formattedDate(event.date))
                .font(.subheadline)
                .foregroundStyle(AppTheme.textMuted)

            if !isPast {
                let labels = ReminderScheduler.plannedReminderLabels(for: event)
                if labels.isEmpty {
                    Text("Všechny připomínky už proběhly")
                        .font(.caption)
                        .foregroundStyle(.orange)
                } else {
                    Text("Připomínky: " + labels.joined(separator: " · "))
                        .font(.caption)
                        .foregroundStyle(AppTheme.textMuted)
                        .lineLimit(2)
                }
            }
        }
        .padding(14)
        .background(AppTheme.card, in: RoundedRectangle(cornerRadius: 14))
        .shadow(color: .black.opacity(0.04), radius: 4, y: 2)
        .contentShape(RoundedRectangle(cornerRadius: 14))
        .onTapGesture {
            if !isPast {
                eventToEdit = event
            }
        }
    }

    private func filtered(_ list: [EventItem]) -> [EventItem] {
        guard let filterCategoryId else { return list }
        return list.filter { $0.categoryId == filterCategoryId }
    }

    private func category(for event: EventItem) -> CategoryTag? {
        guard let id = event.categoryId else { return nil }
        return categories.first { $0.id == id }
    }

    private func deleteEvent(_ event: EventItem) {
        ReminderScheduler.cancel(for: event)
        modelContext.delete(event)
    }

    private func formattedDate(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "cs_CZ")
        formatter.dateStyle = .full
        formatter.timeStyle = .short
        return formatter.string(from: date)
    }
}
