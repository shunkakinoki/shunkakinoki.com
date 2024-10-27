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

import { Analytics } from "@/components/analytics";
import { ThemeProvider } from "@/components/providers";
import { SpeedInsights } from "@/components/speed-insights";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import type { Viewport } from "next";
import { getTranslations } from "next-intl/server";
import Script from "next/script";
import type { ReactNode } from "react";
import "@lightdotso/styles/global.css";
import { connection } from "next/server";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface RootLayoutProps {
  children: ReactNode;
}

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export async function generateMetadata() {
  // ---------------------------------------------------------------------------
  // Server
  // ---------------------------------------------------------------------------

  await connection();

  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------

  const t = await getTranslations({ locale: "en" });

  // ---------------------------------------------------------------------------
  // Return
  // ---------------------------------------------------------------------------

  return {
    title: {
      default: t("site.title"),
      template: `%s - ${siteConfig.name}`,
    },
    metadataBase: new URL("https://shunkakinoki.com"),
    description: siteConfig.description,
    icons: [
      {
        rel: "icon",
        type: "image/png",
        url: "https://assets.light.so/favicon.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        rel: "icon",
        type: "image/png",
        url: "https://assets.light.so/favicon-dark.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    authors: [
      {
        name: "shunkakinoki",
        url: "https://shunkakinoki.com",
      },
    ],
    creator: "shunkakinoki",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
      creator: "@shunkakinoki",
    },
    manifest: `${siteConfig.url}/site.webmanifest`,
  };
}

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

// biome-ignore lint/style/noDefaultExport: <explanation>
export default function RootLayout({ children }: RootLayoutProps) {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "3fff5b53524d4928bae2c465c1ac14f2"}'
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <TailwindIndicator />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}

// -----------------------------------------------------------------------------
// Config
// -----------------------------------------------------------------------------

// biome-ignore lint/style/useNamingConvention: <explanation>
export const experimental_ppr = true;
