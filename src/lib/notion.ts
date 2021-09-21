/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Client } from "@notionhq/client";
import type { Filter, Sort } from "@notionhq/client/build/src/api-types";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const getDatabase = async (databaseId: string) => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  return response.results;
};

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export const getBlocks = async (blockId: string) => {
  const response = await notion.blocks.children.list({ block_id: blockId });
  return response.results;
};

export const queryDatabase = async (
  databaseId: string,
  filter?: Filter,
  sorts?: Sort[],
) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: filter,
    sorts: sorts,
  });
  return response;
};
