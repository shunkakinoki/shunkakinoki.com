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

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  // ---------------------------------------------------------------------------
  // Cache
  // ---------------------------------------------------------------------------

  // "use disabled cache";

  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------

  const t = await getTranslations({ locale: (await params).locale });

  // ---------------------------------------------------------------------------
  // Return
  // ---------------------------------------------------------------------------

  return {
    title: t("notFound.title"),
    description: t("notFound.description"),
  };
}

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

// biome-ignore lint/style/noDefaultExport: <explanation>
// biome-ignore lint/suspicious/useAwait: <explanation>
export default async function NotFoundPage() {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <Suspense fallback={null}>
      <NotFoundInnerPage />
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Inner Page
// -----------------------------------------------------------------------------

// biome-ignore lint/suspicious/useAwait: <explanation>
async function NotFoundInnerPage() {
  // ---------------------------------------------------------------------------
  // Cache
  // ---------------------------------------------------------------------------

  "use cache";

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return <div>Not Found</div>;
}
