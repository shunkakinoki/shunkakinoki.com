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
import { getCachedQueryDatabase } from "@/services/notion";
import { getTranslations } from "next-intl/server";
import { PageHeader, PageHeaderSubheading } from "../components/page-header";

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
    await getCachedQueryDatabase({
      // biome-ignore lint/style/useNamingConvention: <explanation>
      database_id: "ccf0648ddaab42a38644f209e6cd641f",
      filter: {
        or: [
          {
            property: "Date",
            date: {
              equals: dateStart,
            },
          },
        ],
      },
    })
  ).results;

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
        {checklist.length > 0 && checklist[0] && (
          <Checklist content={checklist[0]} />
        )}
      </div>
    </section>
  );
}
