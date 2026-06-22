import SwiftUI

enum AppTheme {
    static let background = Color(red: 1.0, green: 0.96, blue: 0.97)
    static let card = Color.white.opacity(0.92)
    static let accent = Color(red: 0.93, green: 0.45, blue: 0.65)
    static let accentSoft = Color(red: 1.0, green: 0.88, blue: 0.93)
    static let text = Color.black
    static let textMuted = Color.black.opacity(0.55)

    static let pastelOptions: [String] = [
        "#C5CAF9", "#A8B8F5", "#8FA8F0", "#B8E8D8", "#9DDFC4", "#7FD4B8",
        "#FFD4B8", "#FFCBA4", "#FFB890", "#FFF0B3", "#FFE08A", "#FFD966",
        "#FFB8C8", "#FF9EB8", "#FF8AA8", "#E8D4F9", "#D4BCF7", "#C4A8F0",
        "#D4F0FF", "#B8E0FF", "#A0D4FF", "#D4FFD4", "#B8F0B8", "#98E8A8",
        "#FFE4D4", "#FFD1DC", "#F9D4FF", "#E8C4FF", "#C4F0E8", "#B0E8DC",
        "#F0E8C4", "#E8D8A8", "#F5D0E8", "#E8B8D8", "#D0E8F5", "#B8D8F0",
        "#F5E6D0", "#E8D4B8", "#E6D0F5", "#D0F5E6", "#C8F0D8", "#F0D0E8",
    ]

    static func color(from hex: String) -> Color {
        var hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        if hex.count == 8 {
            hex = String(hex.suffix(6))
        }
        guard hex.count == 6, let value = UInt64(hex, radix: 16) else { return accentSoft }
        return Color(
            red: Double((value >> 16) & 0xFF) / 255,
            green: Double((value >> 8) & 0xFF) / 255,
            blue: Double(value & 0xFF) / 255
        )
    }
}

struct PinkScreenBackground: ViewModifier {
    func body(content: Content) -> some View {
        content
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(AppTheme.background.ignoresSafeArea())
    }
}

extension View {
    func pinkScreen() -> some View {
        modifier(PinkScreenBackground())
    }
}
