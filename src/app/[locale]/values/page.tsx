import { getPage } from "@/services/notion";
import type { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import SlugPage from "../[slug]/page";

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const valuesSlugs = {
  en: "d9f72066ffeb4b06aa48c4f27678ade5",
  ja: "40db409b208d4134a29710eccd0c8fa3",
  zh: "7b999c038a4544cdacf93b39c182e22e",
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

  const aboutSlug = valuesSlugs[locale as "en" | "ja" | "zh"] || valuesSlugs.en;
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
export default async function valuesPage({
  params: { locale },
}: { params: { locale: string } }) {
  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------

  unstable_setRequestLocale(locale);

  // ---------------------------------------------------------------------------
  // Services
  // ---------------------------------------------------------------------------

  const valuesSlug =
    valuesSlugs[locale as "en" | "ja" | "zh"] || valuesSlugs.en;

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  // @ts-expect-error
  return <SlugPage params={{ locale: locale, slug: valuesSlug }} />;
}
