import { getPage } from "@/services/notion";
import type { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import SlugPage from "../[slug]/page";

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const causeSlugs = {
  en: "a95efa449e314eefaae7557695b06003",
  ja: "748fb4a50dc94ababcb15a4376405022",
  zh: "a554db2d6f11472bbddec998f5a5f46b",
};

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

export async function generateMetadata({
  params: { locale },
}: { params: { locale: string } }): Promise<Metadata> {
  // ---------------------------------------------------------------------------
  // Services
  // ---------------------------------------------------------------------------

  const aboutSlug = causeSlugs[locale as "en" | "ja" | "zh"] || causeSlugs.en;
  const page = await getPage(aboutSlug);

  // ---------------------------------------------------------------------------
  // Return
  // ---------------------------------------------------------------------------

  return {
    //@ts-ignore
    title: page.properties?.Name?.title[0]?.plain_text,
    // @ts-ignore
    description: page.properties?.Description?.rich_text[0]?.plain_text,
  };
}

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

// biome-ignore lint/style/noDefaultExport: <explanation>
// biome-ignore lint/suspicious/useAwait: <explanation>
export default async function CausePage({
  params: { locale },
}: { params: { locale: string } }) {
  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------

  unstable_setRequestLocale(locale);

  // ---------------------------------------------------------------------------
  // Services
  // ---------------------------------------------------------------------------

  const causeSlug = causeSlugs[locale as "en" | "ja" | "zh"] || causeSlugs.en;

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  // @ts-expect-error
  return <SlugPage params={{ locale: locale, slug: causeSlug }} />;
}
