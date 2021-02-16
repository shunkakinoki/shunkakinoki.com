import {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";

import {MdxRemote} from "next-mdx-remote/types";

import {getGithubSummary} from "@/lib/github";
import BlogScreen from "@/screens/BlogScreen";

export interface Props {
  frontMatter: string;
  source: string;
}

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
}: // eslint-disable-next-line @typescript-eslint/require-await
GetStaticPropsContext) => {
  const result = await getGithubSummary("blog", locale, [2, -1]);
  if (result) {
    const {source} = result;
    return {
      props: {
        frontMatter: JSON.stringify(source),
        source: JSON.stringify(source),
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

const Blog = ({
  frontMatter,
  source,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <BlogScreen
      frontMatter={JSON.parse(frontMatter) as {[key: string]: any}}
      source={JSON.parse(source) as MdxRemote.Source}
    />
  );
};

export default Blog;
