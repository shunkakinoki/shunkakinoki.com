/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Client, isNotionClientError } from "@notionhq/client";
import type {
  QueryDatabaseParameters,
  QueryDatabaseResponse,
  ListBlockChildrenResponse,
} from "@notionhq/client/build/src/api-endpoints.d";

declare type NotionPage = QueryDatabaseResponse["results"][number];
// prettier-ignore
declare type NotionProperty = QueryDatabaseResponse["results"][number]["properties"];

export type blockWithChildren = ListBlockChildrenResponse["results"][number] & {
  children?: blockWithChildren[];
};
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
  plain_text: string;
  href: string | null;
};

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const getDatabase = async (databaseId: string) => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    return response.results;
  } catch (error: unknown) {
    if (isNotionClientError(error)) {
      console.log(error.message);
    }
    return [];
  }
};

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export const getPageTitle = (property: NotionProperty) => {
  return property.Name.type == "title" ? property.Name.title[0].plain_text : "";
};

export const getPageDate = (page: NotionPage) => {
  let dateString = page.last_edited_time;
  if (
    page.properties["publish date"].type == "date" &&
    page.properties["publish date"].date !== null
  ) {
    dateString = page.properties["publish date"].date.start;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return new Date(dateString).toLocaleDateString();
};

export const getBlocks = async (blockId: string) => {
  const blocks: blockWithChildren[] = [];
  let cursor: undefined | string = undefined;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const blocksList = await notion.blocks.children.list({
      start_cursor: cursor,
      block_id: blockId,
    });
    blocks.push(...blocksList.results);

    const next_cursor = blocksList.next_cursor;
    if (!next_cursor) {
      break;
    }
    cursor = next_cursor;
  }
  return blocks;
};

export const queryDatabase = async ({
  database_id,
  filter,
  sorts,
}: QueryDatabaseParameters) => {
  const response = await notion.databases.query({
    database_id: database_id,
    filter: filter,
    sorts: sorts,
  });
  return response;
};
