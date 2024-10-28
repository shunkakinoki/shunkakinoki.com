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

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { type ReactNode, Suspense } from "react";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

// -----------------------------------------------------------------------------
// Paths
// -----------------------------------------------------------------------------

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: Omit<LocaleLayoutProps, "children">): Promise<Metadata> {
  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------

  const t = await getTranslations({ locale: (await params).locale });

  // ---------------------------------------------------------------------------
  // Return
  // ---------------------------------------------------------------------------

  return {
    title: {
      default: t("site.title"),
      template: `%s - ${siteConfig.name}`,
    },
  };
}

// -----------------------------------------------------------------------------
// Layout
// -----------------------------------------------------------------------------

// biome-ignore lint/style/noDefaultExport: <explanation>
// biome-ignore lint/suspicious/useAwait: <explanation>
export default async function RootLayout({
  children,
  params,
}: LocaleLayoutProps) {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <Suspense fallback={null}>
      <RootInnerLayout params={params}>{children}</RootInnerLayout>
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Inner Layout
// -----------------------------------------------------------------------------

export async function RootInnerLayout({ children, params }: LocaleLayoutProps) {
  // ---------------------------------------------------------------------------
  // Cache
  // ---------------------------------------------------------------------------

  // "use disabled cache";

  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------

  // Enable static rendering
  setRequestLocale((await params).locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <div className="relative mx-auto max-w-screen-md bg-background-body px-4 py-8 md:py-12 lg:py-16">
            {children}
          </div>
        </main>
        <SiteFooter />
      </div>
    </NextIntlClientProvider>
  );
}
