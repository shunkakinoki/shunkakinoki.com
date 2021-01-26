import {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";

import { ExtendedRecordMap } from "react-notion-x";

import { resolveNotionPage } from "@/lib/notion";

import PageScreen from "@/screens/PageScreen";

export interface Props {
  recordMap: string;
  title: string;
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
