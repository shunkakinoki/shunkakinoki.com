import {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";

import { NotionAPI } from "notion-client";

import { ExtendedRecordMap } from "react-notion-x";

import PageScreen from "@/screens/PageScreen";

export interface Props {
  recordMap: string;
}

const notion = new NotionAPI();

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: "blocking",
    paths: [],
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
}: // eslint-disable-next-line @typescript-eslint/require-await
GetStaticPropsContext) => {
  try {
    const pageId = params?.pageId as string;
    const recordMap = await notion.getPage(pageId);

    return { props: { recordMap: JSON.stringify(recordMap) }, revalidate: 30 };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

const PageId = ({
  recordMap,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return <PageScreen recordMap={JSON.parse(recordMap) as ExtendedRecordMap} />;
};

export default PageId;
