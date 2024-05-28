import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";

import { defaultLocale, localePrefix, locales, pathnames } from "@/config";
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

export default function middleware(req: NextRequest) {
  // If matches one of the social config, redirect to the social page
  const path = req.nextUrl.pathname.slice(1).toLowerCase();
  const social = socialConfig.find(
    (social) => path === social.name.toLowerCase(),
  );

  if (social) {
    return NextResponse.redirect(social.href);
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
