import { Life } from "@/components/life";
import { getPage } from "@/services/notion";
import type { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import SlugPage from "../[slug]/page";

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const aboutSlugs = {
  en: "779208b885ac41c7913d0c3e7bb97ae6",
  ja: "1e282a0dc8ac4aa3a311027b943b200c",
  zh: "1a0ae715baf5459db23daf07b208d9ef",
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

  const aboutSlug = aboutSlugs[locale as "en" | "ja" | "zh"] || aboutSlugs.en;
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
export default async function AboutPage({
  params: { locale },
}: { params: { locale: string } }) {
  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------

  unstable_setRequestLocale(locale);

  // ---------------------------------------------------------------------------
  // Services
  // ---------------------------------------------------------------------------

  const aboutSlug = aboutSlugs[locale as "en" | "ja" | "zh"] || aboutSlugs.en;

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <>
      {/* @ts-expect-error */}
      <SlugPage params={{ locale: locale, slug: aboutSlug }} />
      <Life />
    </>
  );
}
