import { unstable_setRequestLocale } from "next-intl/server";
import SlugPage from "../[slug]/page";

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

  const causeSlugs = {
    en: "a95efa449e314eefaae7557695b06003",
    ja: "748fb4a50dc94ababcb15a4376405022",
    zh: "a554db2d6f11472bbddec998f5a5f46b",
  };

  const causeSlug = causeSlugs[locale as "en" | "ja" | "zh"] || causeSlugs.en;

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  // @ts-expect-error
  return <SlugPage params={{ slug: causeSlug }} />;
}
