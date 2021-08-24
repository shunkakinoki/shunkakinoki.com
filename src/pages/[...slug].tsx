import type { PagesRetrieveResponse } from "@notionhq/client/build/src/api-endpoints";
import type { Block } from "@notionhq/client/build/src/api-types";
import type {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";

import type { MDXRemoteSerializeResult } from "next-mdx-remote";

import { getGithubContent } from "@/lib/github";
import { getPage, getBlocks } from "@/lib/notion";
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
}: // eslint-disable-next-line @typescript-eslint/require-await
GetStaticPropsContext) => {
  const slugs = params?.slug as string[];

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
    const page = await getPage(pageId);
    const blocks = await getBlocks(pageId);
    const childBlocks = await Promise.all(
      blocks
        .filter(block => {
          return block.has_children;
        })
        .map(async block => {
          return {
            id: block.id,
            children: await getBlocks(block.id),
          };
        }),
    );
    const blocksWithChildren = blocks.map(block => {
      if (block.type === "paragraph") {
        const typedBlock = block[block.type];
        if (block.has_children) {
          typedBlock["children"] = childBlocks.find(x => {
            return x.id === block.id;
          })?.children;
        }
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
        blocks={JSON.parse(blocks) as Block[]}
        content={JSON.parse(content) as PagesRetrieveResponse}
        locale={locale}
        pageId={pageId}
      />
    );
  }

  return <>{pageId}</>;
};

export default PageId;
