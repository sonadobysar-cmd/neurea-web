import SwiftUI

/// Systémová nedělní připomínka — nelze smazat (není to plán v seznamu).
struct WeeklyUpdateBannerView: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Label("Nutná aktualizace appky", systemImage: "exclamationmark.triangle.fill")
                .font(.subheadline.weight(.bold))
                .foregroundStyle(Color.orange)

            Text("Dnes v 22:00 — připoj iPhone k Macu, otevři Upomínky v Xcode a dej ▶ Play. Bez toho appka za ~7 dní přestane fungovat.")
                .font(.subheadline)
                .foregroundStyle(AppTheme.text)
                .fixedSize(horizontal: false, vertical: true)

            Text("Tuto připomínku nelze smazat — je tu každou neděli.")
                .font(.caption)
                .foregroundStyle(AppTheme.textMuted)
        }
        .padding(14)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(AppTheme.card, in: RoundedRectangle(cornerRadius: 14, style: .continuous))
        .rainbowBorder(cornerRadius: 14, lineWidth: 2.5)
        .padding(.horizontal)
        .padding(.top, 8)
        .accessibilityElement(children: .combine)
        .accessibilityLabel("Nutná aktualizace appky. Dnes ve 22 hodin. Připoj iPhone k Macu a v Xcode dej Play.")
    }
}
