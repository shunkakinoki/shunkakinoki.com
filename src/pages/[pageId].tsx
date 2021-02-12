import {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";

import { MdxRemote } from "next-mdx-remote/types";
import { ExtendedRecordMap } from "notion-types";

import validator from "validator";

import { NotionLinks } from "@/const";
import { getGithubContent } from "@/lib/github";
import { resolveNotionPage } from "@/lib/notion";
import BlogScreen from "@/screens/BlogScreen";
import NotionScreen from "@/screens/NotionScreen";

export interface Props {
  content: string;
  frontMatter?: string;
  type: "blog" | "collection" | "page";
}

const coreCollections = ["cause", "mission", "values"];

const notionCollections = [
  "action",
  "bible",
  "diary",
  "endeavor",
  "excerpt",
  "habit",
  "insight",
  "notebook",
  "perseverance",
  "resource",
];

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: "blocking",
    paths: [],
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
  locale,
}: // eslint-disable-next-line @typescript-eslint/require-await
GetStaticPropsContext) => {
  const pageId = params?.pageId as string;
  let notionCollection;

  if (notionCollections.includes(pageId)) {
    switch (pageId) {
      case "action": {
        notionCollection = NotionLinks.action;
        break;
      }
      case "bible": {
        notionCollection = NotionLinks.bible;
        break;
      }
      case "diary": {
        notionCollection = NotionLinks.diary;
        break;
      }
      case "endeavor": {
        notionCollection = NotionLinks.endeavor;
        break;
      }
      case "excerpt": {
        notionCollection = NotionLinks.excerpt;
        break;
      }
      case "habit": {
        notionCollection = NotionLinks.habit;
        break;
      }
      case "insight": {
        notionCollection = NotionLinks.insight;
        break;
      }
      case "notebook": {
        notionCollection = NotionLinks.notebook;
        break;
      }
      case "perseverance": {
        notionCollection = NotionLinks.perseverance;
        break;
      }
      case "resource": {
        notionCollection = NotionLinks.resource;
        break;
      }
      default:
        break;
    }
  }

  if (!validator.isUUID(pageId) && !notionCollection) {
    try {
      const result = await getGithubContent(
        coreCollections.includes(pageId) ? pageId : "blog",
        coreCollections.includes(pageId) ? pageId.toUpperCase() : pageId,
        locale
      );
      if (result) {
        const { frontMatter, source } = result;
        return {
          props: {
            content: JSON.stringify(source),
            frontMatter: JSON.stringify(frontMatter),
            type: "blog",
          },
          revalidate: 30,
        };
      }
    } catch {}
  }

  try {
    const page = await resolveNotionPage(notionCollection || pageId);

    if (page) {
      const { recordMap } = page;
      return {
        props: {
          content: JSON.stringify(recordMap),
          type: notionCollection ? "collection" : "page",
        },
        revalidate: 30,
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

const PageId = ({
  content,
  frontMatter,
  type,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  if (content && frontMatter && type === "blog") {
    return (
      <BlogScreen
        frontMatter={JSON.parse(frontMatter) as { [key: string]: any }}
        source={JSON.parse(content) as MdxRemote.Source}
      />
    );
  }

  return (
    <NotionScreen
      fullPage={type === "collection" ? false : true}
      recordMap={JSON.parse(content) as ExtendedRecordMap}
    />
  );
};

export default PageId;
