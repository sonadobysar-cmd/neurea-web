import { createServerFn } from "@tanstack/react-start";

export type PreviewNote = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  author: string;
  published_at: string;
  members_only: boolean;
};

export type PreviewVoicenote = {
  id: string;
  title: string;
  description: string | null;
  duration_sec: number | null;
  published_at: string;
  members_only: boolean;
};

export const getPreviewNotes = createServerFn({ method: "GET" }).handler(async (): Promise<PreviewNote[]> => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("notes")
    .select("id, slug, title, excerpt, author, published_at, members_only")
    .order("published_at", { ascending: false });
  if (error) return [];
  return data ?? [];
});

export const getPreviewVoicenotes = createServerFn({ method: "GET" }).handler(
  async (): Promise<PreviewVoicenote[]> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("voicenotes")
      .select("id, title, description, duration_sec, published_at, members_only")
      .order("published_at", { ascending: false });
    if (error) return [];
    return data ?? [];
  },
);
