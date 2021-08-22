import type {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";

import type { MDXRemoteSerializeResult } from "next-mdx-remote";

import { getGithubContent } from "@/lib/github";
import { BlogScreen } from "@/screens/BlogScreen";
import { ContentScreen } from "@/screens/ContentScreen";

export interface Props {
  content: string;
  frontMatter?: string;
  slug?: string;
  type: "blog" | "content" | "collection" | "page";
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
      throw new Error("No result");
    } catch (err) {
      return {
        notFound: true,
        revalidate: 30,
      };
    }
  }

  const pageId = slugs[0];

  if (coreCollections.includes(pageId)) {
    const result = await getGithubContent(pageId, pageId.toUpperCase(), locale);
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
  frontMatter,
  slug,
  type,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  if (content && frontMatter && slug && type === "blog") {
    return (
      <BlogScreen
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        frontMatter={JSON.parse(frontMatter) as { [key: string]: any }}
        source={JSON.parse(content) as MDXRemoteSerializeResult}
        slug={JSON.parse(slug) as string}
      />
    );
  }

  if (content && frontMatter && type === "content") {
    return (
      <ContentScreen
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        frontMatter={JSON.parse(frontMatter) as { [key: string]: any }}
        source={JSON.parse(content) as MDXRemoteSerializeResult}
      />
    );
  }

  return <></>;
};

export default PageId;
