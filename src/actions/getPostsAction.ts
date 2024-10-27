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
import { type NotionPageObject, getQueryDatabase } from "@/services/notion";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type PostsResponse = {
  entries: NotionPageObject[];
  nextCursor: string | undefined;
  hasMore: boolean;
};

// -----------------------------------------------------------------------------
// Action
// -----------------------------------------------------------------------------

export async function getPostsAction(
  startCursor?: string | undefined,
): Promise<PostsResponse> {
  // ---------------------------------------------------------------------------
  // Services
  // ---------------------------------------------------------------------------

  const res = await getQueryDatabase({
    // biome-ignore lint/style/useNamingConvention: <explanation>
    database_id: "105dc0a4cffa807ead38c5c5184e9836",
    // biome-ignore lint/style/useNamingConvention: <explanation>
    start_cursor: startCursor,
    // biome-ignore lint/style/useNamingConvention: <explanation>
    page_size: ITEMS_PER_PAGE,
  });

  const entries = res.results
    //@ts-ignore
    .filter((db) => !!db.properties.Date?.date)
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
