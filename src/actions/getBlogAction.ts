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

"use server";

import { ITEMS_PER_PAGE } from "@/const";
import {
  type NotionPageObject,
  getCachedQueryDatabase,
} from "@/services/notion";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type BlogResponse = {
  entries: NotionPageObject[];
  nextCursor: string | undefined;
  hasMore: boolean;
};

// -----------------------------------------------------------------------------
// Action
// -----------------------------------------------------------------------------

export async function getBlogAction(
  locale: string,
  startCursor?: string | undefined,
): Promise<BlogResponse> {
  // ---------------------------------------------------------------------------
  // Services
  // ---------------------------------------------------------------------------

  const res = await getCachedQueryDatabase({
    // biome-ignore lint/style/useNamingConvention: <explanation>
    database_id: "e4ef762ca07f465e8f5cce906732140b",
    filter: {
      and: [
        {
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "Locale",
          select: {
            equals: locale,
          },
        },
      ],
    },
    // biome-ignore lint/style/useNamingConvention: <explanation>
    start_cursor: startCursor,
    // biome-ignore lint/style/useNamingConvention: <explanation>
    page_size: ITEMS_PER_PAGE,
  });

  const entries = res.results
    .filter((db) => {
      return (
        //@ts-ignore
        !!db.properties.Date?.date &&
        //@ts-ignore
        !!db.properties.Published.checkbox &&
        //@ts-ignore
        !!db.properties.Locale?.select
      );
    })
    //@ts-ignore
    .filter((db) => !!db.properties.Date?.date && !!db?.icon?.emoji)
    .sort(
      (a, b) =>
        //@ts-ignore
        new Date(b.properties.Date.date.start).getTime() -
        //@ts-ignore
        new Date(a.properties.Date.date.start).getTime(),
    );

  // -----------------------------------------------------------------------------
  // Return
  // -----------------------------------------------------------------------------

  return {
    entries,
    nextCursor: res.next_cursor ?? undefined,
    hasMore: !!res.has_more,
  };
}
