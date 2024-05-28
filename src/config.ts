import type { Pathnames } from "next-intl/navigation";

export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${port}`;

export const defaultLocale = "en" as const;
export const locales = ["en", "de"] as const;

export const pathnames = {
  "/": "/",
  "/pathnames": {
    en: "/pathnames",
    de: "/pfadnamen",
  },
} satisfies Pathnames<typeof locales>;

export const localePrefix = "as-needed" as const;

export type AppPathnames = keyof typeof pathnames;
