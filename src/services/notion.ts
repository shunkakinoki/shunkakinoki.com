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

import { Client } from "@notionhq/client";
import type {
  DatabaseObjectResponse,
  ListBlockChildrenResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
  QueryDatabaseParameters,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints.d";
import { unstable_cache } from "next/cache";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

declare type NotionPage = QueryDatabaseResponse["results"][number];
declare type NotionProperty =
  //@ts-ignore
  QueryDatabaseResponse["results"][number]["properties"];

export type NotionPageObject =
  | PageObjectResponse
  | PartialPageObjectResponse
  | PartialDatabaseObjectResponse
  | DatabaseObjectResponse;

// biome-ignore lint/style/useNamingConvention: <explanation>
export type blockWithChildren = ListBlockChildrenResponse["results"][number] & {
  children?: blockWithChildren[];
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  openGraphData?: any;
};

// biome-ignore lint/style/useNamingConvention: <explanation>
export type richText = {
  type: "text";
  text: {
    content: string;
    link: {
      url: string;
    } | null;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color:
      | "default"
      | "gray"
      | "brown"
      | "orange"
      | "yellow"
      | "green"
      | "blue"
      | "purple"
      | "pink"
      | "red"
      | "gray_background"
      | "brown_background"
      | "orange_background"
      | "yellow_background"
      | "green_background"
      | "blue_background"
      | "purple_background"
      | "pink_background"
      | "red_background";
  };
  // biome-ignore lint/style/useNamingConvention: <explanation>
  plain_text: string;
  href: string | null;
};

// -----------------------------------------------------------------------------
// Client
// -----------------------------------------------------------------------------

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

export const retrieveDatabase = async ({
  database_id,
  // biome-ignore lint/style/useNamingConvention: <explanation>
}: { database_id: string }) => {
  const response = await notion.databases.retrieve({
    // biome-ignore lint/style/useNamingConvention: <explanation>
    database_id: database_id,
  });
  return response;
};

export const getCachedQueryDatabase = async ({
  database_id,
  filter,
  sorts,
  start_cursor,
  page_size,
}: QueryDatabaseParameters) => {
  const response = await notion.databases.query({
    // biome-ignore lint/style/useNamingConvention: <explanation>
    database_id: database_id,
    filter: filter,
    sorts: sorts,
    // biome-ignore lint/style/useNamingConvention: <explanation>
    start_cursor: start_cursor,
    // biome-ignore lint/style/useNamingConvention: <explanation>
    page_size: page_size,
  });
  return response;
};

export const getPage = async (pageId: string) => {
  // biome-ignore lint/style/useNamingConvention: <explanation>
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export const getPageTitle = (property: NotionProperty) => {
  return property.Name.type === "title"
    ? property.Name.title[0].plain_text
    : "";
};

export const getPageDate = (page: NotionPage) => {
  //@ts-ignore
  let dateString = page.last_edited_time;
  if (
    //@ts-ignore
    page.properties["publish date"].type === "date" &&
    //@ts-ignore
    page.properties["publish date"].date !== null
  ) {
    //@ts-ignore
    dateString = page.properties["publish date"].date.start;
  }
  return new Date(dateString).toLocaleDateString();
};

export const getBlocks = async (blockId: string) => {
  const blocks: blockWithChildren[] = [];
  let cursor: undefined | string;

  while (true) {
    const blocksList = await notion.blocks.children.list({
      // biome-ignore lint/style/useNamingConvention: <explanation>
      start_cursor: cursor,
      // biome-ignore lint/style/useNamingConvention: <explanation>
      block_id: blockId,
    });
    blocks.push(...blocksList.results);

    const nextCursor = blocksList.next_cursor;
    if (!nextCursor) {
      break;
    }
    cursor = nextCursor;
  }
  return blocks;
};

export const getDatabaseStats = async () => {
  const response = await fetch(
    "https://shunkakinoki.notion.site/api/v3/queryCollection",
    {
      headers: {
        "cache-control": "no-cache",
        "content-type": "application/json",
      },
      body: '{"source":{"type":"collection","id":"10c3fb1a-29ed-450c-8fe4-69ba3c341adb","spaceId":"e205c9f3-fa7b-4acc-b9d5-a76b150dcfce"},"collectionView":{"id":"2bcd2adf-e8d0-4778-8b98-aa632d7362cb","spaceId":"e205c9f3-fa7b-4acc-b9d5-a76b150dcfce"},"loader":{"reducers":{"collection_group_results":{"type":"results","limit":50},"table:uncategorized:htQ<:max":{"type":"aggregation","aggregation":{"property":"htQ<","aggregator":"max"}},"table:uncategorized:mLup:max":{"type":"aggregation","aggregation":{"property":"mLup","aggregator":"max"}},"table:uncategorized:A[_n:max":{"type":"aggregation","aggregation":{"property":"A[_n","aggregator":"max"}},"table:uncategorized:L\\\\Bo:sum":{"type":"aggregation","aggregation":{"property":"L\\\\Bo","aggregator":"sum"}},"table:uncategorized:QCJk:sum":{"type":"aggregation","aggregation":{"property":"QCJk","aggregator":"sum"}},"table:uncategorized:\\\\iGG:sum":{"type":"aggregation","aggregation":{"property":"\\\\iGG","aggregator":"sum"}},"table:uncategorized:UeRe:sum":{"type":"aggregation","aggregation":{"property":"UeRe","aggregator":"sum"}},"table:uncategorized:@Jfv:sum":{"type":"aggregation","aggregation":{"property":"@Jfv","aggregator":"sum"}},"table:uncategorized:B?Vi:percent_checked":{"type":"aggregation","aggregation":{"property":"B?Vi","aggregator":"percent_checked"}},"table:uncategorized:bpQ^:sum":{"type":"aggregation","aggregation":{"property":"bpQ^","aggregator":"sum"}}},"sort":[{"property":"Q|ST","direction":"descending"}],"searchQuery":"","userTimeZone":"Asia/Tokyo"},"aggregationStatus":"full"}',
      method: "POST",
    },
  );

  const data = await response.json();
  return data?.result?.reducerResults;
};

// -----------------------------------------------------------------------------
// Cached
// -----------------------------------------------------------------------------

export const getCachedgetCachedQueryDatabase = unstable_cache(
  getCachedQueryDatabase,
  ["notion", "query-database"],
  {
    revalidate: 300,
  },
);

export const getCachedBlocks = unstable_cache(getBlocks, ["notion", "blocks"], {
  revalidate: 30,
});

export const getCachedPage = unstable_cache(getPage, ["notion", "page"], {
  revalidate: 300,
});

export const getCachedDatabaseStats = unstable_cache(
  getDatabaseStats,
  ["notion", "stats"],
  {
    revalidate: 300,
  },
);
