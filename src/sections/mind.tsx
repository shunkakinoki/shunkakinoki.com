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

import { MindMap } from "@/components/mind-map";
import { getCachedQueryDatabase } from "@/services/notion";
import { getTranslations } from "next-intl/server";
import { PageHeader, PageHeaderSubheading } from "../components/page-header";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

export interface MindProps {
  dateStart: string;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export async function Mind({ dateStart }: MindProps) {
  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------

  const t = await getTranslations();

  // ---------------------------------------------------------------------------
  // Services
  // ---------------------------------------------------------------------------

  const mindMap = (
    await getCachedQueryDatabase({
      // biome-ignore lint/style/useNamingConvention: <explanation>
      database_id: "be3e2449e1324b518f78c21e168f5a78",
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
      !!db.properties["Total Lifted"]?.number ||
      //@ts-ignore
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      !!db.properties["Running"]?.number
    );
  });

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (mindMap.length === 0) {
    return null;
  }

  return (
    <section>
      <PageHeader>
        <PageHeaderSubheading>{t("Mind.title")}</PageHeaderSubheading>
      </PageHeader>
      <div className="mt-8 w-full flex-col space-y-3">
        {mindMap.length > 0 && mindMap[0] && <MindMap content={mindMap[0]} />}
      </div>
    </section>
  );
}
