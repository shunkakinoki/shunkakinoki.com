import { NotionAPI } from "notion-client";
import {
  ExtendedRecordMap,
  PageMap,
  SearchParams,
  SearchResults,
} from "notion-types";
import { getPageTitle, getAllPagesInSpace, parsePageId } from "notion-utils";

import { NotionLinks } from "@/const";

const notion = new NotionAPI();

export interface CanonicalPageMap {
  [canonicalPageId: string]: string;
}

export async function getPage(pageId: string): Promise<ExtendedRecordMap> {
  const recordMap = await notion.getPage(pageId);
  return recordMap;
}

export async function getAllPages(
  rootNotionPageId: string,
  rootNotionSpaceId: string
): Promise<PageMap> {
  const pageMap = await getAllPagesInSpace(
    rootNotionPageId,
    rootNotionSpaceId,
    getPage
  );
  return pageMap;
}

export async function resolveNotionCollection(type: "blog") {
  let pageId: string;

  switch (type) {
    case "blog":
      pageId = NotionLinks.blog;
    default:
      pageId = NotionLinks.blog;
  }

  const recordMap = await getPage(pageId);
  const title = getPageTitle(recordMap);

  return {
    recordMap,
    title,
  };
}

export async function resolveNotionPage(pageId: string) {
  const parsedPageId = parsePageId(pageId);

  if (parsedPageId) {
    const recordMap = await getPage(pageId);
    const title = getPageTitle(recordMap);

    return { parsedPageId, recordMap, title };
  } else {
    return null;
  }
}

export async function search(params: SearchParams): Promise<SearchResults> {
  return notion.search(params);
}
