import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";

import { defaultLocale, localePrefix, locales, pathnames } from "@/config";
import { internalConfig } from "./config/internal";
import { socialConfig } from "./config/social";

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
