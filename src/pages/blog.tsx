import type { Page } from "@notionhq/client/build/src/api-types";
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";

import { getDatabase } from "@/lib/notion";
import { BlogScreen } from "@/screens/BlogScreen";

export type Props = {
  database: Page[];
  locale?: string;
};

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
}: GetStaticPropsContext) => {
  if (!process.env.NOTION_BLOG_ID) {
    throw new Error("process.NOTION_BLOG_ID is not defined");
  }
  const database = await getDatabase(process.env.NOTION_BLOG_ID);
  if (database) {
    return {
      props: {
        database: database,
        locale: locale,
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

export const Blog = ({
  database,
  locale,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return <BlogScreen database={database} locale={locale} />;
};

export default BlogScreen;
