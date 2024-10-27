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

import { Checklist } from "@/components/check-list";
import { PageHeader, PageHeaderSubheading } from "@/components/page-header";
import { getQueryDatabase } from "@/services/notion";
import { getTranslations } from "next-intl/server";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

export interface CheckProps {
  dateStart: string;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export async function Check({ dateStart }: CheckProps) {
  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------

  const t = await getTranslations();

  // ---------------------------------------------------------------------------
  // Services
  // ---------------------------------------------------------------------------

  const checklist = (
    await getQueryDatabase({
      // biome-ignore lint/style/useNamingConvention: <explanation>
      database_id: "ccf0648ddaab42a38644f209e6cd641f",
      filter: {
        and: [
          {
            property: "Date",
            date: {
              equals: dateStart,
            },
          },
        ],
      },
    })
  ).results.filter((db) => {
    return (
      //@ts-ignore
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      !!db.properties["Name"]?.title[0]?.plain_text
    );
  });

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (checklist.length === 0) {
    return null;
  }

  return (
    <section>
      <PageHeader>
        <PageHeaderSubheading>{t("Check.title")}</PageHeaderSubheading>
      </PageHeader>
      <div className="mt-8 w-full flex-col space-y-3">
        {checklist && <Checklist contents={checklist} />}
      </div>
    </section>
  );
}
