import type { GetPageResponse } from "@notionhq/client/build/src/api-endpoints";
import type {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";

import type { MDXRemoteSerializeResult } from "next-mdx-remote";

import { getGithubContent } from "@/lib/github";
import { getDatabase } from "@/lib/notion";
import { LandingScreen } from "@/screens/LandingScreen";

export interface Props {
  database: GetPageResponse[];
  source: string;
}

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
}: // eslint-disable-next-line @typescript-eslint/require-await
GetStaticPropsContext) => {
  const result = await getGithubContent("about", "ABOUT", locale, [2, 3]);
  if (!process.env.NOTION_PRODUCT_ID) {
    throw new Error("process.NOTION_PRODUCT_ID is not defined");
  }
  const database = await getDatabase(process.env.NOTION_PRODUCT_ID);
  if (result) {
    const { source } = result;
    return {
      props: {
        source: JSON.stringify(source),
        database: database,
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

export const Index = ({
  source,
  database,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <LandingScreen
      source={JSON.parse(source) as MDXRemoteSerializeResult}
      database={database}
    />
  );
};

export default Index;
