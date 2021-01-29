import {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";

import { ExtendedRecordMap } from "notion-types";

import { resolveNotionPage } from "@/lib/notion";

import NotionScreen from "@/screens/NotionScreen";

export interface Props {
  recordMap: string;
}

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
  const pageId = params?.pageId as string;

  try {
    const page = await resolveNotionPage(pageId);

    if (page) {
      const { recordMap } = page;
      return {
        props: {
          recordMap: JSON.stringify(recordMap),
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

const PageId = ({
  recordMap,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <NotionScreen
      fullPage
      recordMap={JSON.parse(recordMap) as ExtendedRecordMap}
    />
  );
};

export default PageId;
