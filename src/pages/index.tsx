import type { GetPageResponse } from "@notionhq/client/build/src/api-endpoints";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

import type { MDXRemoteSerializeResult } from "next-mdx-remote";

import { getGithubContent } from "@/lib/github";
import { queryDatabase } from "@/lib/notion";
import { LandingScreen } from "@/screens/LandingScreen";

export interface Props {
  database: GetPageResponse[];
  source: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
}: // eslint-disable-next-line @typescript-eslint/require-await
GetServerSidePropsContext) => {
  const result = await getGithubContent("about", "ABOUT", locale, [2, 3]);
  if (!process.env.NOTION_PRODUCT_ID) {
    throw new Error("process.NOTION_PRODUCT_ID is not defined");
  }
  const dbResult = await queryDatabase({
    database_id: process.env.NOTION_PRODUCT_ID,
    sorts: [
      {
        property: "Created At",
        direction: "descending",
      },
    ],
  });
  const database = dbResult.results;
  if (result) {
    const { source } = result;
    return {
      props: {
        source: JSON.stringify(source),
        database: database,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
};

export const Index = ({
  source,
  database,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  return (
    <LandingScreen
      source={JSON.parse(source) as MDXRemoteSerializeResult}
      database={database}
    />
  );
};

export default Index;
