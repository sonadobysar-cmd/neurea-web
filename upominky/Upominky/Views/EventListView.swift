import SwiftUI
import SwiftData

struct EventListView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \EventItem.date) private var events: [EventItem]

    @State private var showAddSheet = false

    private var upcoming: [EventItem] {
        events.filter { $0.date >= Date() }
    }

    private var past: [EventItem] {
        Array(events.filter { $0.date < Date() }.reversed())
    }

    var body: some View {
        NavigationStack {
            Group {
                if events.isEmpty {
                    ContentUnavailableView {
                        Label("Zatím nic v plánu", systemImage: "calendar.badge.plus")
                    } description: {
                        Text("Přidej termín — připomínky nastavíme za tebe.")
                    } actions: {
                        Button("Přidat plán") { showAddSheet = true }
                            .buttonStyle(.borderedProminent)
                    }
                } else {
                    List {
                        if !upcoming.isEmpty {
                            Section("Nadcházející") {
                                ForEach(upcoming) { event in
                                    EventRow(event: event)
                                }
                                .onDelete { indexSet in
                                    deleteEvents(at: indexSet, from: upcoming)
                                }
                            }
                        }

                        if !past.isEmpty {
                            Section("Proběhlé") {
                                ForEach(past) { event in
                                    EventRow(event: event, isPast: true)
                                }
                                .onDelete { indexSet in
                                    deleteEvents(at: indexSet, from: past)
                                }
                            }
                        }
                    }
                }
            }
            .navigationTitle("Upomínky")
            .toolbar {
                ToolbarItem(placement: .primaryAction) {
                    Button {
                        showAddSheet = true
                    } label: {
                        Image(systemName: "plus")
                    }
                    .accessibilityLabel("Přidat plán")
                }
            }
            .sheet(isPresented: $showAddSheet) {
                AddEventView()
            }
        }
    }

    private func deleteEvents(at offsets: IndexSet, from list: [EventItem]) {
        for index in offsets {
            let event = list[index]
            ReminderScheduler.cancel(for: event)
            modelContext.delete(event)
        }
    }
}

private struct EventRow: View {
    let event: EventItem
    var isPast: Bool = false

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(event.title)
                .font(.headline)
                .foregroundStyle(isPast ? .secondary : .primary)

            Text(formattedDate(event.date))
                .font(.subheadline)
                .foregroundStyle(.secondary)

            if !isPast {
                let labels = ReminderScheduler.plannedReminderLabels(for: event)
                if labels.isEmpty {
                    Text("Všechny připomínky už proběhly")
                        .font(.caption)
                        .foregroundStyle(.orange)
                } else {
                    Text("Připomínky: " + labels.joined(separator: " · "))
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .lineLimit(2)
                }
            }
        }
        .padding(.vertical, 4)
    }

    private func formattedDate(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "cs_CZ")
        formatter.dateStyle = .full
        formatter.timeStyle = .short
        return formatter.string(from: date)
    }
}
