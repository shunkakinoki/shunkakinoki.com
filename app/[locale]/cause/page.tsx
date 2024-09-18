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
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
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
  // i18n
  // ---------------------------------------------------------------------------

  const t = await getTranslations({ locale });

  // ---------------------------------------------------------------------------
  // Return
  // ---------------------------------------------------------------------------

  return {
    title: t("cause.title"),
    description: t("cause.description"),
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

  return <SlugPage params={{ locale: locale, slug: causeSlug }} />;
}
