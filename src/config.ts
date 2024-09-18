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

import type { Pathnames } from "next-intl/navigation";

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${port}`;

export const defaultLocale = "en" as const;
export const locales = ["en", "ja", "zh"] as const;

export const pathnames = {
  "/": "/",
  "/about": "/about",
  "/blog": "/blog",
  "/cause": "/cause",
  "/dashboard": "/dashboard",
  "/mission": "/mission",
  "/products": "/products",
  "/values": "/values",
} satisfies Pathnames<typeof locales>;

export const localePrefix = "as-needed" as const;

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type AppPathnames = keyof typeof pathnames | string;
