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

import { defaultLocale, locales } from "@/config";
import type { MetadataRoute } from "next";

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const pathnames = [
  "/",
  "/about",
  "/blog",
  "/cause",
  "/dashboard",
  "/history",
  "/journal",
  "/mission",
  "/products",
  "/social",
  "/values",
];
const host = "https://shunkakinoki.com";

// -----------------------------------------------------------------------------
// Sitemap
// -----------------------------------------------------------------------------

// biome-ignore lint/style/noDefaultExport: <explanation>
export default function sitemap(): MetadataRoute.Sitemap {
  function getUrl(pathname: string, locale: string) {
    return `${host}/${locale}${pathname === "/" ? "" : pathname}`;
  }

  return pathnames.map((pathname) => ({
    url: getUrl(pathname, defaultLocale),
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [locale, getUrl(pathname, locale)]),
      ),
    },
  }));
}
