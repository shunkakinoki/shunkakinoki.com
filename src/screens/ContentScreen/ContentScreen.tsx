import type { FC } from "react";

import type { Props as ContentProps } from "@/components/Content";
import { Content } from "@/components/Content";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Seo } from "@/components/Seo";

export type Props = ContentProps;

export const ContentScreen: FC<Props> = ({ frontMatter, source }) => {
  return (
    <>
      <Seo title={JSON.stringify(frontMatter)} />
      <Header />
      <div className="flex flex-col justify-center items-start mx-auto max-w-2xl">
        <Content frontMatter={frontMatter} source={source} />
      </div>
      <Footer />
    </>
  );
};
