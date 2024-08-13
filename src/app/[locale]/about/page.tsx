import { unstable_setRequestLocale } from "next-intl/server";

import { Life } from "@/components/life";

import SlugPage from "../[slug]/page";

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

  const aboutSlugs = {
    en: "779208b885ac41c7913d0c3e7bb97ae6",
    ja: "1e282a0dc8ac4aa3a311027b943b200c",
    zh: "1a0ae715baf5459db23daf07b208d9ef",
  };

  const aboutSlug = aboutSlugs[locale as "en" | "ja" | "zh"] || aboutSlugs.en;

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <>
      {/* @ts-expect-error */}
      <SlugPage params={{ slug: aboutSlug }} />
      <Life />
    </>
  );
}
