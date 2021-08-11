import type { FC } from "react";

import type { Props as BlogProps } from "@/components/Blog";
import { Blog } from "@/components/Blog";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export type Props = BlogProps;

export const BlogScreen: FC<Props> = ({ frontMatter, source, slug }) => {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-start mx-auto max-w-2xl">
        <Blog frontMatter={frontMatter} source={source} slug={slug} />
      </div>
      <Footer />
    </>
  );
};
