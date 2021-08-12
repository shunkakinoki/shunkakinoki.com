import type { FC } from "react";

import type { Props as AboutProps } from "@/components/About";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { History } from "@/components/History";
import { Life } from "@/components/Life";
import { Newsletter } from "@/components/Newsletter";
import { Product } from "@/components/Product";
import { Seo } from "@/components/Seo";
import { Social } from "@/components/Social";

export type Props = AboutProps;

export const LandingScreen: FC<Props> = ({ source }) => {
  return (
    <>
      <Seo />
      <Header />
      <div className="flex flex-col justify-center items-start mx-auto max-w-2xl">
        <About isPartial source={source} />
        <Product isPartial />
        <History isPartial />
        <Life isPartial />
        <Social isPartial />
        <Newsletter />
      </div>
      <Footer />
    </>
  );
};
