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
  const t = await getTranslations({ locale: "en" });

  return {
    title: {
      default: t("site.title"),
      template: `%s - ${siteConfig.name}`,
    },
    metadataBase: new URL("https://shunkakinoki.com"),
    description: siteConfig.description,
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
    <>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen font-sans antialiased",
            fontSans.variable,
          )}
        >
          <Script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "3fff5b53524d4928bae2c465c1ac14f2", "spa": true}'
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
    </>
  );
}

// -----------------------------------------------------------------------------
// Config
// -----------------------------------------------------------------------------

// biome-ignore lint/style/useNamingConvention: <explanation>
export const experimental_ppr = true;
export const revalidate = 300;
