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

import type { MetadataRoute } from "next";
import { getTranslations } from "next-intl/server";

// -----------------------------------------------------------------------------
// Manifest
// -----------------------------------------------------------------------------

// biome-ignore lint/style/noDefaultExport: <explanation>
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------

  const locale = "en";
  const t = await getTranslations({ locale });

  // ---------------------------------------------------------------------------
  // Return
  // ---------------------------------------------------------------------------

  return {
    name: t("manifest.name"),
    // biome-ignore lint/style/useNamingConvention: <explanation>
    start_url: "/",
    // biome-ignore lint/style/useNamingConvention: <explanation>
    theme_color: "#101E33",
  };
}
