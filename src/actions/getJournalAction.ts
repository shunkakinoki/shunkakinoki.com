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

import { getCachedQueryDatabase } from "@/services/notion";

// -----------------------------------------------------------------------------
// Action
// -----------------------------------------------------------------------------

export async function getJournalAction(
  startCursor: string | undefined = undefined,
) {
  // ---------------------------------------------------------------------------
  // Constants
  // ---------------------------------------------------------------------------

  const itemsPerPage = 3;

  // ---------------------------------------------------------------------------
  // Services
  // ---------------------------------------------------------------------------

  const res = await getCachedQueryDatabase({
    // biome-ignore lint/style/useNamingConvention: <explanation>
    database_id: "badf29d87d2f4e03b2c5451a627d8618",
    // biome-ignore lint/style/useNamingConvention: <explanation>
    start_cursor: startCursor,
    // biome-ignore lint/style/useNamingConvention: <explanation>
    page_size: itemsPerPage,
  });

  const entries = res.results
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
    nextCursor: res.next_cursor,
    hasMore: !!res.has_more,
  };
}
