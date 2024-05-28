import { unstable_setRequestLocale } from "next-intl/server";

import SlugPage from "../[slug]/page";

export default async function valuesPage({
  params: { locale },
}: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  const valuesSlugs = {
    en: "d9f72066ffeb4b06aa48c4f27678ade5",
    ja: "40db409b208d4134a29710eccd0c8fa3",
    zh: "7b999c038a4544cdacf93b39c182e22e",
  };

  const valuesSlug =
    valuesSlugs[locale as "en" | "ja" | "zh"] || valuesSlugs.en;

  // @ts-expect-error
  return <SlugPage params={{ slug: valuesSlug }} />;
}
