import { NotionAPI } from "notion-client";
import type {
  ExtendedRecordMap,
  PageMap,
  SearchParams,
  SearchResults,
} from "notion-types";
import { getPageTitle, getAllPagesInSpace, parsePageId } from "notion-utils";

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
  rootNotionSpaceId: string,
): Promise<PageMap> {
  const pageMap = await getAllPagesInSpace(
    rootNotionPageId,
    rootNotionSpaceId,
    getPage,
  );
  return pageMap;
}

// eslint-disable-next-line prettier/prettier
export async function resolveNotionPage(pageId: string): Promise<{
  parsedPageId: string;
  recordMap: ExtendedRecordMap;
  title: string;
} | null> {
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
