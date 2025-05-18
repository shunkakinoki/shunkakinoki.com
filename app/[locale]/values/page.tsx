// Copyright 2023-2024 Shun Kakinoki.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { connection } from "next/server";
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
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  // ---------------------------------------------------------------------------
  // Cache
  // ---------------------------------------------------------------------------

  "use cache";

  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------

  const t = await getTranslations({ locale: (await params).locale });

  // ---------------------------------------------------------------------------
  // Return
  // ---------------------------------------------------------------------------

  return {
    title: t("values.title"),
    description: t("values.description"),
  };
}

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

// biome-ignore lint/style/noDefaultExport: <explanation>
// biome-ignore lint/suspicious/useAwait: <explanation>
export default async function valuesPage({
  params,
}: { params: Promise<{ locale: string }> }) {
  // ---------------------------------------------------------------------------
  // Server
  // ---------------------------------------------------------------------------

  await connection();

  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------

  setRequestLocale((await params).locale);

  // ---------------------------------------------------------------------------
  // Services
  // ---------------------------------------------------------------------------

  const valuesSlug =
    valuesSlugs[(await params).locale as "en" | "ja" | "zh"] || valuesSlugs.en;

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <SlugPage
      params={Promise.resolve({
        locale: (await params).locale,
        slug: valuesSlug,
      })}
    />
  );
}
