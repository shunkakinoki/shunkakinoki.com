import { getPage } from "@/services/notion";
import type { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import SlugPage from "../[slug]/page";

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const missionSlugs = {
  en: "8db37d862bdd4e9eb0723c14de4ca0c5",
  ja: "a53125f645464bc6aed2ddb0fd29f82d",
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

  const aboutSlug =
    missionSlugs[locale as "en" | "ja" | "zh"] || missionSlugs.en;
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
export default async function MissionPage({
  params: { locale },
}: { params: { locale: string } }) {
  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------

  unstable_setRequestLocale(locale);

  // ---------------------------------------------------------------------------
  // Services
  // ---------------------------------------------------------------------------

  const missionSlug =
    missionSlugs[locale as "en" | "ja" | "zh"] || missionSlugs.en;

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  // @ts-expect-error
  return <SlugPage params={{ locale: locale, slug: missionSlug }} />;
}
