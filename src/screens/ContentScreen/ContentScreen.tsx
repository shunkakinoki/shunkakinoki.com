import type { FC } from "react";

import type { Props as ContentProps } from "@/components/Content";
import { Content } from "@/components/Content";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Seo } from "@/components/Seo";

export type Props = ContentProps & { title: string };

export const ContentScreen: FC<Props> = ({ source, title }) => {
  return (
    <>
      <Seo title={title.charAt(0).toUpperCase() + title.slice(1)} />
      <Header />
      <div className="flex flex-col justify-center items-start mx-auto max-w-2xl">
        <Content source={source} />
      </div>
      <Footer />
    </>
  );
};
