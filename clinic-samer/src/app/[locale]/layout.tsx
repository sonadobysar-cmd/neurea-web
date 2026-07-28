import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary } from "@/data/i18n/dictionaries";
import { HtmlAttrs } from "@/components/HtmlAttrs";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { isLocale, localeMeta, locales, type Locale } from "@/lib/locales";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: localeMeta[raw].ogLocale,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const meta = localeMeta[locale];

  return (
    <div lang={meta.htmlLang} dir={meta.dir} className="site-shell">
      <HtmlAttrs locale={locale} />
      <SiteNav locale={locale} dict={dict} />
      <main>{children}</main>
      <SiteFooter locale={locale} dict={dict} />
    </div>
  );
}
