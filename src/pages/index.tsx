import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";

import { MdxRemote } from "next-mdx-remote/types";

import { getGithubContent } from "@/lib/github";
import LandingScreen from "@/screens/LandingScreen";

export interface Props {
  source: string;
}

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
}: // eslint-disable-next-line @typescript-eslint/require-await
GetStaticPropsContext) => {
  try {
    const result = await getGithubContent("about", "ABOUT", locale, [2, 3]);
    if (result) {
      const { source } = result;
      return {
        props: {
          source: JSON.stringify(source),
        },
        revalidate: 30,
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch {
    return {
      notFound: true,
    };
  }
};

const Index = ({
  source,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return <LandingScreen source={JSON.parse(source) as MdxRemote.Source} />;
};

export default Index;
