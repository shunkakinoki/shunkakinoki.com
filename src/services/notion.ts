import { Client } from "@notionhq/client";
import type {
  ListBlockChildrenResponse,
  QueryDatabaseParameters,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints.d";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

declare type NotionPage = QueryDatabaseResponse["results"][number];
declare type NotionProperty =
  //@ts-ignore
  QueryDatabaseResponse["results"][number]["properties"];

// biome-ignore lint/style/useNamingConvention: <explanation>
export type blockWithChildren = ListBlockChildrenResponse["results"][number] & {
  children?: blockWithChildren[];
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

export const queryDatabase = async ({
  database_id,
  filter,
  sorts,
}: QueryDatabaseParameters) => {
  const response = await notion.databases.query({
    // biome-ignore lint/style/useNamingConvention: <explanation>
    database_id: database_id,
    filter: filter,
    sorts: sorts,
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
  let cursor: undefined | string = undefined;

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
