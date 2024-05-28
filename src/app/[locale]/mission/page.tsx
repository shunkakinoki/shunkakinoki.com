import { unstable_setRequestLocale } from "next-intl/server";

import SlugPage from "../[slug]/page";

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function MissionPage({
  params: { locale },
}: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  const missionSlugs = {
    en: "8db37d862bdd4e9eb0723c14de4ca0c5",
    ja: "a53125f645464bc6aed2ddb0fd29f82d",
    zh: "a554db2d6f11472bbddec998f5a5f46b",
  };

  const missionSlug =
    missionSlugs[locale as "en" | "ja" | "zh"] || missionSlugs.en;

  // @ts-expect-error
  return <SlugPage params={{ slug: missionSlug }} />;
}
