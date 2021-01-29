import { GetStaticProps, InferGetStaticPropsType } from "next";

import { ExtendedRecordMap } from "notion-types";

import { NotionLinks } from "@/const";
import { resolveNotionPage } from "@/lib/notion";
import NotionScreen from "@/screens/NotionScreen";

export interface Props {
  recordMap: string;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const page = await resolveNotionPage(NotionLinks.plan);

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

const plan = ({
  recordMap,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <NotionScreen
      fullPage
      recordMap={JSON.parse(recordMap) as ExtendedRecordMap}
    />
  );
};

export default plan;
