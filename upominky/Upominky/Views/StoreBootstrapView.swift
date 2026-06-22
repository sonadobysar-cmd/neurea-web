import SwiftUI
import SwiftData

struct StoreBootstrapView: View {
    @State private var container: ModelContainer?
    @State private var errorMessage: String?
    @State private var isLoading = true

    var body: some View {
        Group {
            if let container {
                ContentView()
                    .modelContainer(container)
            } else if let errorMessage {
                storeErrorView(message: errorMessage)
            } else {
                loadingView
            }
        }
        .background(AppTheme.background.ignoresSafeArea())
        .task {
            await loadStore()
        }
    }

    private var loadingView: some View {
        VStack(spacing: 16) {
            ProgressView()
                .tint(AppTheme.accent)
            Text("Načítám tvoje plány…")
                .font(.headline)
                .foregroundStyle(AppTheme.text)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }

    private func storeErrorView(message: String) -> some View {
        VStack(spacing: 20) {
            Image(systemName: "exclamationmark.triangle.fill")
                .font(.system(size: 44))
                .foregroundStyle(.orange)
            Text("Data se nepodařilo načíst")
                .font(.title2.bold())
                .foregroundStyle(AppTheme.text)
            Text(message)
                .multilineTextAlignment(.center)
                .foregroundStyle(AppTheme.textMuted)
                .padding(.horizontal)
            Button("Zkusit znovu") {
                Task { await loadStore() }
            }
            .buttonStyle(.borderedProminent)
            .tint(AppTheme.accent)
        }
        .padding()
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }

    @MainActor
    private func loadStore() async {
        isLoading = true
        errorMessage = nil
        container = nil

        switch UpominkyStore.makeContainer() {
        case .success(let loaded):
            container = loaded
        case .failure(let error):
            errorMessage = error.localizedDescription
        }

        isLoading = false
    }
}
