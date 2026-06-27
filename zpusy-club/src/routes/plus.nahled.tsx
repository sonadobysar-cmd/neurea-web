import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/plus/nahled")({
  head: () => ({ meta: [{ title: "Náhled klubu — Zpussy+" }] }),
  component: () => <Outlet />,
});
