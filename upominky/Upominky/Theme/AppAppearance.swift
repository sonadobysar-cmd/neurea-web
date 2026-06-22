import SwiftUI
import UIKit

enum AppAppearance {
    static func configure() {
        let accent = UIColor(red: 0.93, green: 0.45, blue: 0.65, alpha: 1)
        let background = UIColor(red: 1.0, green: 0.96, blue: 0.97, alpha: 1)

        let nav = UINavigationBarAppearance()
        nav.configureWithOpaqueBackground()
        nav.backgroundColor = background
        nav.shadowColor = .clear
        nav.titleTextAttributes = [.foregroundColor: accent]
        nav.largeTitleTextAttributes = [.foregroundColor: accent]

        let bar = UINavigationBar.appearance()
        bar.standardAppearance = nav
        bar.scrollEdgeAppearance = nav
        bar.compactAppearance = nav
        bar.tintColor = accent

        UITableView.appearance().backgroundColor = .clear
        UIScrollView.appearance().backgroundColor = .clear
    }
}
