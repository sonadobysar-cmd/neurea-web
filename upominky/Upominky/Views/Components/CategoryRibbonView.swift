import SwiftUI

struct CategoryRibbonView: View {
    let name: String
    let colorHex: String
    var isSelected: Bool = false
    var compact: Bool = false

    var body: some View {
        Text(name)
            .font(compact ? .caption2.weight(.semibold) : .caption.weight(.semibold))
            .foregroundStyle(AppTheme.text)
            .padding(.horizontal, compact ? 8 : 12)
            .padding(.vertical, compact ? 4 : 6)
            .background(
                Capsule()
                    .fill(AppTheme.color(from: colorHex))
                    .shadow(color: .black.opacity(0.06), radius: 2, y: 1)
            )
            .overlay {
                if isSelected {
                    Capsule()
                        .strokeBorder(AppTheme.text, lineWidth: 2)
                }
            }
    }
}

struct CategoryRibbonPicker: View {
    let categories: [CategoryTag]
    @Binding var selectedId: UUID?

    var body: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 10) {
                ForEach(categories, id: \.id) { category in
                    Button {
                        selectedId = category.id
                    } label: {
                        CategoryRibbonView(
                            name: category.name,
                            colorHex: category.colorHex,
                            isSelected: selectedId == category.id
                        )
                    }
                    .buttonStyle(.plain)
                }
            }
            .padding(.vertical, 4)
        }
    }
}
