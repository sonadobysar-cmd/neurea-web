import SwiftUI

struct RainbowBorderModifier: ViewModifier {
    var cornerRadius: CGFloat = 14
    var lineWidth: CGFloat = 3

    func body(content: Content) -> some View {
        content
            .overlay {
                RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
                    .strokeBorder(
                        AngularGradient(
                            colors: [
                                .red, .orange, .yellow, .green, .cyan, .blue, .purple, .pink, .red,
                            ],
                            center: .center
                        ),
                        lineWidth: lineWidth
                    )
            }
    }
}

extension View {
    func rainbowBorder(cornerRadius: CGFloat = 14, lineWidth: CGFloat = 3) -> some View {
        modifier(RainbowBorderModifier(cornerRadius: cornerRadius, lineWidth: lineWidth))
    }
}

struct TomorrowRainbowBorder: ViewModifier {
    let isActive: Bool
    var cornerRadius: CGFloat = 14

    @ViewBuilder
    func body(content: Content) -> some View {
        if isActive {
            content.rainbowBorder(cornerRadius: cornerRadius)
        } else {
            content
        }
    }
}

struct RainbowSectionHeader: View {
    let title: String

    var body: some View {
        Text(title)
            .font(.headline.weight(.bold))
            .foregroundStyle(AppTheme.text)
            .padding(.horizontal, 14)
            .padding(.vertical, 8)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(AppTheme.card, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
            .rainbowBorder(cornerRadius: 12, lineWidth: 2.5)
    }
}
