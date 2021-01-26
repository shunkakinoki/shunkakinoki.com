import { GetStaticProps, InferGetStaticPropsType } from "next";

import { ExtendedRecordMap } from "react-notion-x";

import { NotionLinks } from "@/const";
import { resolveNotionPage } from "@/lib/notion";
import BlogScreen from "@/screens/BlogScreen";

export interface Props {
  recordMap: string;
  title: string;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const page = await resolveNotionPage(NotionLinks.blog);

    if (page) {
      const { recordMap, title } = page;
      return {
        props: {
          recordMap: JSON.stringify(recordMap),
          title: JSON.stringify(title),
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
