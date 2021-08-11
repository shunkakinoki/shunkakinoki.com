import { NotionAPI } from "notion-client";
import type { SearchParams } from "notion-types";
import { getPageTitle, getAllPagesInSpace, parsePageId } from "notion-utils";

const notion = new NotionAPI();

export interface CanonicalPageMap {
  [canonicalPageId: string]: string;
}

export const getPage = async (pageId: string) => {
  const recordMap = await notion.getPage(pageId);
  return recordMap;
};

export const getAllPages = async (
  rootNotionPageId: string,
  rootNotionSpaceId: string,
) => {
  const pageMap = await getAllPagesInSpace(
    rootNotionPageId,
    rootNotionSpaceId,
    getPage,
  );
  return pageMap;
};

// eslint-disable-next-line prettier/prettier
export const resolveNotionPage = async (pageId: string) => {
  const parsedPageId = parsePageId(pageId);

  if (parsedPageId) {
    const recordMap = await getPage(pageId);
    const title = getPageTitle(recordMap);

    return { parsedPageId, recordMap, title };
  } else {
    return null;
  }
};

export const search = async (params: SearchParams) => {
  return notion.search(params);
};
