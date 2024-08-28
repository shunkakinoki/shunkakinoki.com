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
