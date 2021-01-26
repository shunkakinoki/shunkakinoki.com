import {
  NextPage,
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";

import { ExtendedRecordMap } from "react-notion-x";

import { resolveNotionCollection } from "@/lib/notion";
import BlogScreen from "@/screens/BlogScreen";

export interface Props {
  recordMap: string;
  title: string;
}

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
}: // eslint-disable-next-line @typescript-eslint/require-await
GetStaticPropsContext) => {
  try {
    const page = await resolveNotionCollection("blog");
    const { recordMap, title } = page;

    return {
      props: {
        recordMap: JSON.stringify(recordMap),
        title: JSON.stringify(title),
      },
      revalidate: 30,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

const Blog = ({
  recordMap,
  title,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <BlogScreen
      recordMap={JSON.parse(recordMap) as ExtendedRecordMap}
      title={JSON.parse(title) as string}
    />
  );
};

export default Blog;
