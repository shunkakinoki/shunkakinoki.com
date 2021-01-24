import {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";
import { NotionAPI } from "notion-client";
import { getPageTitle, getAllPagesInSpace } from "notion-utils";

import { ExtendedRecordMap } from "react-notion-x";

import PageScreen from "@/screens/PageScreen";

export interface Props {
  recordMap: string;
  title: string;
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
    const title = getPageTitle(recordMap);

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

const PageId = ({
  recordMap,
  title,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <PageScreen
      recordMap={JSON.parse(recordMap) as ExtendedRecordMap}
      title={JSON.parse(title) as string}
    />
  );
};

export default PageId;
