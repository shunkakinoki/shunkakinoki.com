import type { GetPageResponse } from "@notionhq/client/build/src/api-endpoints";
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";

import { getDatabase } from "@/lib/notion";
import { BlogScreen } from "@/screens/BlogScreen";

export type Props = {
  database: GetPageResponse[];
  locale?: string;
};

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
}: GetStaticPropsContext) => {
  if (!process.env.NOTION_BLOG_ID) {
    throw new Error("process.NOTION_BLOG_ID is not defined");
  }
  const database = await getDatabase(process.env.NOTION_BLOG_ID);
  const filteredDatabase = database.filter(db => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return !!db.properties.Category.select && !!db.properties.Date?.date;
  });
  if (database) {
    return {
      props: {
        database: filteredDatabase,
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
