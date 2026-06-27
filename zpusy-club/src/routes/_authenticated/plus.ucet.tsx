import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MemberGate } from "@/components/PaywallRedirect";
import { PlusShell } from "@/components/PlusShell";

export const Route = createFileRoute("/_authenticated/plus/ucet")({
  head: () => ({ meta: [{ title: "Účet — Zpussy+" }] }),
  component: () => (
    <MemberGate>
      <Page />
    </MemberGate>
  ),
});

function Page() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [membership, setMembership] = useState<{ plan: string; status: string; expires_at: string | null } | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      setEmail(u.user.email ?? "");
      const { data: p } = await supabase
        .from("profiles")
        .select("display_name, nickname, bio")
        .eq("id", u.user.id)
        .maybeSingle();
      if (p) {
        setDisplayName(p.display_name ?? "");
        setNickname(p.nickname ?? "");
        setBio(p.bio ?? "");
      }
      const { data: m } = await supabase
        .from("memberships")
        .select("plan, status, expires_at")
        .eq("user_id", u.user.id)
        .maybeSingle();
      setMembership(m);
    })();
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return;
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: u.user.id, display_name: displayName, nickname: nickname || null, bio });
    if (error) setErr(error.message);
    else setMsg("Uloženo.");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  return (
    <PlusShell title="Účet">
      <div className="grid lg:grid-cols-3 gap-6 max-w-5xl">
        <form onSubmit={save} className="lg:col-span-2 rounded-3xl bg-white/[0.04] border border-white/10 p-6 md:p-8 grid gap-4">
          <h3 className="font-display font-black text-2xl mb-2">Profil</h3>
          <label className="grid gap-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-white/50">Email</span>
            <input value={email} readOnly className="bg-white/[0.06] border border-white/10 rounded-full px-5 py-3 text-sm text-white/60" />
          </label>
          <label className="grid gap-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-white/50">Jméno</span>
            <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="bg-white/[0.06] border border-white/10 rounded-full px-5 py-3 text-sm outline-none focus:border-[var(--pink)]" />
          </label>
          <label className="grid gap-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-white/50">Přezdívka (chat)</span>
            <input value={nickname} onChange={(e) => setNickname(e.target.value)} className="bg-white/[0.06] border border-white/10 rounded-full px-5 py-3 text-sm outline-none focus:border-[var(--pink)]" />
          </label>
          <label className="grid gap-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-white/50">Bio</span>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} className="bg-white/[0.06] border border-white/10 rounded-2xl px-5 py-3 text-sm outline-none focus:border-[var(--pink)]" />
          </label>
          {err && <div className="text-xs text-[var(--pink)]">{err}</div>}
          {msg && <div className="text-xs text-[var(--teal)]">{msg}</div>}
          <button className="bg-[var(--pink)] text-white font-bold py-3 rounded-full hover:bg-white hover:text-[var(--pink)] transition self-start px-8">Uložit</button>
        </form>

        <aside className="rounded-3xl bg-gradient-to-br from-[var(--pink)]/30 to-purple-500/20 border border-white/10 p-6 md:p-8 grid gap-3 h-fit">
          <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--teal)]">Členství</div>
          {membership ? (
            <>
              <div className="font-display font-black text-3xl tracking-tight">
                {membership.plan === "month" ? "Měsíční" : membership.plan === "year" ? "Roční" : "Founder"}
              </div>
              <div className="text-xs text-white/70">
                Stav: <span className="text-[var(--teal)] font-bold uppercase">{membership.status}</span>
              </div>
              {membership.expires_at && (
                <div className="text-xs text-white/70">
                  Platí do: {new Date(membership.expires_at).toLocaleDateString("cs-CZ")}
                </div>
              )}
              {!membership.expires_at && (
                <div className="text-xs text-[var(--teal)] font-bold">♥ Doživotní přístup</div>
              )}
            </>
          ) : (
            <div className="text-sm text-white/60">Bez aktivního členství.</div>
          )}
          <button onClick={signOut} className="mt-4 bg-white/10 hover:bg-white/20 text-white text-sm font-bold py-2.5 rounded-full transition">
            Odhlásit
          </button>
        </aside>
      </div>
    </PlusShell>
  );
}
