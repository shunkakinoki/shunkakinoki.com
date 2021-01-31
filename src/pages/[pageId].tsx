import matter from "gray-matter";
import {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";

import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import { ExtendedRecordMap } from "notion-types";

import { NotionLinks } from "@/const";
import { resolveNotionPage } from "@/lib/notion";
import BlogScreen, { Props as BlogScreenProps } from "@/screens/BlogScreen";
import NotionScreen from "@/screens/NotionScreen";

export type Props = {
  recordMap: string;
  type: "blog" | "collection" | "page";
} & Partial<BlogScreenProps>;

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

  try {
    const page = await resolveNotionPage(notionCollection || pageId);

    if (page) {
      const { recordMap } = page;
      return {
        props: {
          recordMap: JSON.stringify(recordMap),
          type: notionCollection ? "collection" : "blog",
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
  recordMap,
  type,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  if (content && frontMatter && type === "blog") {
    return <BlogScreen frontMatter={frontMatter} content={content} />;
  }
  return (
    <NotionScreen
      fullPage={type === "collection" ? false : true}
      recordMap={JSON.parse(recordMap) as ExtendedRecordMap}
    />
  );
};

export default PageId;
