export const metadata = {
  robots: { index: false, follow: false },
  title: "Interní — MamaSOS",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="bg-ink px-4 py-2 text-center text-xs font-semibold text-white">
        Interní stránka — není určena pro veřejný web
      </div>
      {children}
    </div>
  );
}
