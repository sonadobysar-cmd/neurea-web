import SwiftUI
import SwiftData

struct ManageCategoriesView: View {
    @Environment(\.dismiss) private var dismiss
    @Environment(\.modelContext) private var modelContext
    @Query(sort: [SortDescriptor(\CategoryTag.sortOrder), SortDescriptor(\CategoryTag.name)])
    private var categories: [CategoryTag]

    @State private var newName = ""
    @State private var selectedColorHex = AppTheme.pastelOptions[0]

    var body: some View {
        NavigationStack {
            List {
                Section {
                    ForEach(categories, id: \.id) { category in
                        HStack(spacing: 12) {
                            CategoryRibbonView(name: category.name, colorHex: category.colorHex)
                            Spacer()
                            if category.isSystem {
                                Text("výchozí")
                                    .font(.caption)
                                    .foregroundStyle(AppTheme.textMuted)
                            }
                        }
                    }
                    .onDelete(perform: deleteCategories)
                } header: {
                    Text("Tvoje štítky")
                } footer: {
                    Text("Výchozí štítky nelze smazat. Vlastní můžeš přidat níže.")
                }

                Section("Nový štítek") {
                    TextField("Název štítku", text: $newName)
                        #if os(iOS)
                        .textInputAutocapitalization(.sentences)
                        #endif

                    LazyVGrid(columns: [GridItem(.adaptive(minimum: 36), spacing: 10)], spacing: 10) {
                        ForEach(AppTheme.pastelOptions, id: \.self) { hex in
                            Button {
                                selectedColorHex = hex
                            } label: {
                                Circle()
                                    .fill(AppTheme.color(from: hex))
                                    .frame(width: 34, height: 34)
                                    .overlay {
                                        if selectedColorHex == hex {
                                            Circle()
                                                .strokeBorder(AppTheme.text, lineWidth: 2.5)
                                        }
                                    }
                            }
                            .buttonStyle(.plain)
                        }
                    }
                    .padding(.vertical, 4)

                    Button("Přidat štítek") {
                        addCategory()
                    }
                    .disabled(newName.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
                }
            }
            .scrollContentBackground(.hidden)
            .pinkScreen()
            .navigationTitle("Štítky")
            #if os(iOS)
            .navigationBarTitleDisplayMode(.inline)
            #endif
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Hotovo") { dismiss() }
                }
            }
        }
    }

    private func addCategory() {
        let name = newName.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !name.isEmpty else { return }
        let tag = CategoryTag(
            name: name,
            colorHex: selectedColorHex,
            sortOrder: (categories.map(\.sortOrder).max() ?? 0) + 1
        )
        modelContext.insert(tag)
        try? modelContext.save()
        newName = ""
    }

    private func deleteCategories(at offsets: IndexSet) {
        for index in offsets {
            let category = categories[index]
            guard !category.isSystem else { continue }
            clearCategory(from: category.id)
            modelContext.delete(category)
        }
        try? modelContext.save()
    }

    private func clearCategory(from id: UUID) {
        let descriptor = FetchDescriptor<EventItem>()
        guard let events = try? modelContext.fetch(descriptor) else { return }
        for event in events where event.categoryId == id {
            event.categoryId = nil
        }
    }
}
