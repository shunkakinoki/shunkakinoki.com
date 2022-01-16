/* eslint-disable @typescript-eslint/ban-ts-comment */

import type { GetPageResponse } from "@notionhq/client/build/src/api-endpoints";

import type {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";

import type { MDXRemoteSerializeResult } from "next-mdx-remote";

import { SocialLinks } from "@/const/SocialLinks";
import { getGithubContent } from "@/lib/github";
import type { blockWithChildren } from "@/lib/notion";
import { getPage, getBlocks, queryDatabase } from "@/lib/notion";
import { ContentScreen } from "@/screens/ContentScreen";
import { NotionScreen } from "@/screens/NotionScreen";

export interface Props {
  content: string;
  title?: string;
  blocks?: string;
  locale?: string;
  pageId?: string;
}

const coreCollections = ["cause", "mission", "values"];

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
}: GetStaticPropsContext) => {
  const slugs = params?.slug as string[];

  if (
    slugs.length === 3 &&
    slugs[0].length === 4 &&
    slugs[1].length === 2 &&
    slugs[2].length === 2 &&
    !isNaN(Number(slugs[0])) &&
    !isNaN(Number(slugs[1])) &&
    !isNaN(Number(slugs[2]))
  ) {
    const date = new Date(`${slugs[0]}/${slugs[1]}/${slugs[2]}`).toISOString();
    if (!process.env.NOTION_BLOG_ID) {
      throw new Error("process.NOTION_BLOG_ID is not defined");
    }
    const database = await queryDatabase({
      database_id: process.env.NOTION_BLOG_ID,
      filter: {
        and: [
          {
            property: "Category",
            select: { equals: "Journal" },
          },
          {
            property: "Date",
            date: {
              equals: date,
            },
          },
        ],
      },
    });
    if (database.results && database.results[0] && database.results[0]?.id) {
      return {
        redirect: {
          destination: `/${database.results[0]?.id}`,
          permanent: true,
        },
      };
    }
  }

  const pageId = slugs[0];

  if (coreCollections.includes(pageId)) {
    const result = await getGithubContent(pageId, pageId.toUpperCase(), locale);
    if (result) {
      const { source } = result;
      return {
        props: {
          content: JSON.stringify(source),
          title: pageId,
          type: "content",
        },
        revalidate: 300,
      };
    } else {
      return {
        notFound: true,
        revalidate: 300,
      };
    }
  }

  if (slugs.length !== 1) {
    return {
      notFound: true,
      revalidate: 300,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  if (SocialLinks[pageId] && SocialLinks[pageId]?.startsWith("https://")) {
    return {
      redirect: {
        destination: SocialLinks[pageId],
        permanent: true,
      },
    };
  }

  try {
    const page = await getPage(pageId);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (page.properties?.Published && !page.properties?.Published?.checkbox) {
      return {
        notFound: true,
        revalidate: 30,
      };
    }
    const blocks = await getBlocks(pageId);
    const childBlocks = await Promise.all(
      blocks
        .filter(block => {
          //@ts-ignore
          return block.has_children;
        })
        .map(async block => {
          return {
            id: block.id,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            children: await getBlocks(block.id),
          };
        }),
    );
    const blocksWithChildren = blocks.map(block => {
      //@ts-ignore
      if (block.has_children) {
        block.children = childBlocks.find(x => {
          return x.id === block.id;
        })?.children;
      }
      return block;
    });

    if (page) {
      return {
        props: {
          blocks: JSON.stringify(blocksWithChildren),
          content: JSON.stringify(page),
          locale: locale,
          pageId: pageId,
        },
      };
    }
    throw new Error("No result");
  } catch (err) {
    return {
      notFound: true,
      revalidate: 30,
    };
  }
};

export const PageId = ({
  content,
  title,
  locale,
  blocks,
  pageId,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  if (content && title) {
    return (
      <ContentScreen
        source={JSON.parse(content) as MDXRemoteSerializeResult}
        title={title}
      />
    );
  }

  if (content && blocks && pageId) {
    return (
      <NotionScreen
        blocks={JSON.parse(blocks) as blockWithChildren[]}
        content={JSON.parse(content) as GetPageResponse}
        locale={locale}
        pageId={pageId}
      />
    );
  }

  return <>{pageId}</>;
};

export default PageId;
