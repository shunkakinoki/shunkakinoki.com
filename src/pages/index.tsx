import type {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";

import type { MDXRemoteSerializeResult } from "next-mdx-remote";

import { getGithubContent } from "@/lib/github";
import { LandingScreen } from "@/screens/LandingScreen";

export interface Props {
  source: string;
}

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
}: // eslint-disable-next-line @typescript-eslint/require-await
GetStaticPropsContext) => {
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
      revalidate: 30,
    };
  }
};

export const Index = ({
  source,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <LandingScreen source={JSON.parse(source) as MDXRemoteSerializeResult} />
  );
};

export default Index;
