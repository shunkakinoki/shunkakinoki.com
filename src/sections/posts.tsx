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

import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { Link } from "@/navigation";
import { getCachedQueryDatabase } from "@/services/notion";
import { getTranslations } from "next-intl/server";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export async function Posts() {
  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------

  const t = await getTranslations();

  // ---------------------------------------------------------------------------
  // Services
  // ---------------------------------------------------------------------------

  const res = (
    await getCachedQueryDatabase({
      // biome-ignore lint/style/useNamingConvention: <explanation>
      database_id: "105dc0a4cffa807ead38c5c5184e9836",
    })
  ).results;

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <section>
      <PageHeader>
        <PageHeaderHeading>{t("posts.title")}</PageHeaderHeading>
      </PageHeader>
      <div className="mt-8 w-full flex-col space-y-3">
        {res.map((page) => {
          // @ts-ignore
          const date = new Date(page.properties.Date.date.start).toLocaleString(
            "en",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            },
          );
          return (
            <div key={page.id} className="flex space-x-4">
              <Link
                // @ts-expect-error
                href={`/${page.id}`}
                className="line-clamp-1 flex grow items-center font-extrabold text-text hover:text-text-weak hover:underline"
              >
                <div className="text-xl md:text-2xl">
                  {/* @ts-ignore */}
                  {page.properties.Name?.title[0]?.plain_text || ""}
                </div>
              </Link>
              <div className="flex flex-none items-center justify-center text-sm text-text-weak">
                {date}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
