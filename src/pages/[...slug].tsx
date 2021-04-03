import type {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";

import type { MdxRemote } from "next-mdx-remote/types";
import type { ExtendedRecordMap } from "notion-types";
import { parsePageId } from "notion-utils";

import validator from "validator";

import { NotionLinks } from "@/const";
import { getGithubContent, getGithubSummary } from "@/lib/github";
import { resolveNotionPage } from "@/lib/notion";
import BlogScreen from "@/screens/BlogScreen";
import ContentScreen from "@/screens/ContentScreen";
import NotionScreen from "@/screens/NotionScreen";

export interface Props {
  content: string;
  frontMatter?: string;
  slug?: string;
  type: "blog" | "content" | "collection" | "page";
}

const blogCollections = ["blog", "pioneer"];

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
  const slugs = params?.slug as string[];

  if (slugs?.length !== 1) {
    try {
      const result = await getGithubContent(
        slugs[0],
        slugs?.splice(0, 1).join("/"),
        locale,
      );
      if (result) {
        const { frontMatter, source } = result;
        return {
          props: {
            content: JSON.stringify(source),
            frontMatter: JSON.stringify(frontMatter),
            type: "content",
          },
          revalidate: 30,
        };
      }
    } catch (err) {
      return {
        notFound: true,
        revalidate: 30,
      };
    }
  }

  const pageId = slugs[0];

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

  if (!validator.isUUID(parsePageId(pageId) || "") && !notionCollection) {
    console.log(!validator.isUUID(pageId));

    if (blogCollections.includes(pageId)) {
      const result = await getGithubSummary(pageId, locale);
      if (result) {
        const { frontMatter, source } = result;
        return {
          props: {
            content: JSON.stringify(source),
            frontMatter: JSON.stringify(frontMatter),
            slug: JSON.stringify(pageId),
            type: "blog",
          },
          revalidate: 30,
        };
      } else {
        return {
          notFound: true,
          revalidate: 30,
        };
      }
    }

    if (coreCollections.includes(pageId)) {
      const result = await getGithubContent(
        pageId,
        pageId.toUpperCase(),
        locale,
      );
      if (result) {
        const { frontMatter, source } = result;
        return {
          props: {
            content: JSON.stringify(source),
            frontMatter: JSON.stringify(frontMatter),
            type: "content",
          },
          revalidate: 30,
        };
      } else {
        return {
          notFound: true,
          revalidate: 30,
        };
      }
    }

    try {
      const result = await getGithubContent("blog", pageId, locale);
      if (result) {
        const { frontMatter, source } = result;
        return {
          props: {
            content: JSON.stringify(source),
            frontMatter: JSON.stringify(frontMatter),
            type: "content",
          },
          revalidate: 30,
        };
      }
    } catch (err) {
      return {
        notFound: true,
        revalidate: 30,
      };
    }
  }

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
      revalidate: 30,
    };
  }
};

const PageId = ({
  content,
  frontMatter,
  slug,
  type,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  if (content && frontMatter && slug && type === "blog") {
    return (
      <BlogScreen
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        frontMatter={JSON.parse(frontMatter) as { [key: string]: any }}
        source={JSON.parse(content) as MdxRemote.Source}
        slug={JSON.parse(slug) as string}
      />
    );
  }

  if (content && frontMatter && type === "content") {
    return (
      <ContentScreen
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
