"use client";

export function AdminLogoutButton() {
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <button type="button" onClick={logout} className="btn-outline-gold">
      <span>Odhlásit</span>
    </button>
  );
}

