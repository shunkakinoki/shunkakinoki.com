import {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";

import { MdxRemote } from "next-mdx-remote/types";
import { ExtendedRecordMap } from "notion-types";

import { NotionLinks } from "@/const";
import { getBlogContent } from "@/lib/github";
import { resolveNotionPage } from "@/lib/notion";
import BlogScreen from "@/screens/BlogScreen";
import NotionScreen from "@/screens/NotionScreen";

export interface Props {
  content: ExtendedRecordMap | MdxRemote.Source;
  frontMatter?: { [key: string]: any };
  type: "blog" | "collection" | "page";
}

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

  if (!notionCollection) {
    const result = await getBlogContent(pageId, locale);
    if (result) {
      const { frontMatter, source } = result;
      return {
        props: {
          content: source,
          frontMatter: frontMatter,
          type: "blog",
        },
        revalidate: 30,
      };
    }
  }

  try {
    const page = await resolveNotionPage(notionCollection || pageId);

    if (page) {
      const { recordMap } = page;
      return {
        props: {
          content: recordMap,
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
        frontMatter={frontMatter as { [key: string]: any }}
        source={content as MdxRemote.Source}
      />
    );
  }

  return (
    <NotionScreen
      fullPage={type === "collection" ? false : true}
      recordMap={content as ExtendedRecordMap}
    />
  );
};

export default PageId;
