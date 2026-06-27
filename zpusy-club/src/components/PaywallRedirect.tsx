import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/** Render children only when user has an active membership. Otherwise redirect to checkout. */
export function MemberGate({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) {
        navigate({ to: "/auth", search: { redirect: window.location.pathname } });
        return;
      }
      const { data } = await supabase
        .from("memberships")
        .select("status, expires_at")
        .eq("user_id", u.user.id)
        .maybeSingle();
      const active = data?.status === "active" && (!data.expires_at || new Date(data.expires_at) > new Date());
      if (!active) {
        navigate({ to: "/plus/checkout" });
        return;
      }
      setOk(true);
    })();
  }, []);

  if (!ok) {
    return (
      <div className="min-h-screen grid place-items-center bg-[var(--ink)] text-white/60 text-sm">
        Načítám klub…
      </div>
    );
  }
  return <>{children}</>;
}
