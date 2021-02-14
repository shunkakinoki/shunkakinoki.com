import {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";

import { MdxRemote } from "next-mdx-remote/types";

import { getGithubContent } from "@/lib/github";
import CreditsScreen from "@/screens/CreditsScreen";

export interface Props {
  content: string;
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: "blocking",
    paths: [],
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
}: // eslint-disable-next-line @typescript-eslint/require-await
GetStaticPropsContext) => {
  try {
    const result = await getGithubContent("credits", "CREDITS", locale);
    if (result) {
      const { source } = result;
      return {
        props: {
          content: JSON.stringify(source),
        },
        revalidate: 30,
      };
    }
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

const Credits = ({
  content,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return <CreditsScreen source={JSON.parse(content) as MdxRemote.Source} />;
};

export default Credits;
