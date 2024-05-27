import { Client } from "@notionhq/client";
import type { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints.d";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

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
