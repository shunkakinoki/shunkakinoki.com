import {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";

import {MdxRemote} from "next-mdx-remote/types";

import {getGithubContent} from "@/lib/github";
import AboutScreen from "@/screens/AboutScreen";
export interface Props {
  source: string;
}

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
}: // eslint-disable-next-line @typescript-eslint/require-await
GetStaticPropsContext) => {
  const result = await getGithubContent("about", "ABOUT", locale, [2, -1]);
  if (result) {
    const {source} = result;
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

const About = ({
  source,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return <AboutScreen source={JSON.parse(source) as MdxRemote.Source} />;
};

export default About;
