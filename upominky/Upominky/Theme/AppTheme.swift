import SwiftUI

enum AppTheme {
    static let background = Color(red: 1.0, green: 0.96, blue: 0.97)
    static let card = Color.white.opacity(0.92)
    static let accent = Color(red: 0.93, green: 0.45, blue: 0.65)
    static let accentSoft = Color(red: 1.0, green: 0.88, blue: 0.93)
    static let text = Color.black
    static let textMuted = Color.black.opacity(0.55)

    static let pastelOptions: [String] = [
        "#C5CAF9", "#B8E8D8", "#FFD4B8", "#FFF0B3", "#FFB8C8",
        "#E8D4F9", "#D4F0FF", "#D4FFD4", "#FFE4D4", "#F9D4FF",
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
            .background(AppTheme.background.ignoresSafeArea())
    }
}

extension View {
    func pinkScreen() -> some View {
        modifier(PinkScreenBackground())
    }
}
