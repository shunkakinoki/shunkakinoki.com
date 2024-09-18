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

import { defaultLocale, localePrefix, locales, pathnames } from "@/config";
import { internalConfig } from "@/config/internal";
import { rewriteConfig } from "@/config/rewrite";
import { socialConfig } from "@/config/social";
import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";

// -----------------------------------------------------------------------------
// Middleware
// -----------------------------------------------------------------------------

export const intlMiddleware = createMiddleware({
  defaultLocale,
  locales,
  pathnames,
  localePrefix,
});

// biome-ignore lint/style/noDefaultExport: <explanation>
export default function middleware(req: NextRequest) {
  // If matches one of the social config, redirect to the social page
  const path = req.nextUrl.pathname.slice(1).toLowerCase();

  // Check if the path matches one of the social config
  const soclialLink = socialConfig.find(
    (social) => path === social.name.toLowerCase(),
  );

  // If matches one of the internal config, redirect to the internal page
  const link =
    soclialLink ||
    internalConfig.find((internal) => path === internal.name.toLowerCase());

  if (link) {
    return NextResponse.redirect(link.href);
  }

  // Check if the path matches one of the rewrite config
  const rewriteLink = rewriteConfig.find(
    (rewrite) => path === rewrite.name.toLowerCase(),
  );

  if (rewriteLink) {
    return NextResponse.rewrite(new URL(rewriteLink.href, req.url));
  }

  return intlMiddleware(req);
}

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(en|ja|zh)/:path*",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
