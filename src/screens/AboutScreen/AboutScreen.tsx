import type { FC } from "react";

import type { Props as AboutProps } from "@/components/About";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Life } from "@/components/Life";

export type Props = AboutProps;

export const AboutScreen: FC<Props> = ({ source }) => {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-start mx-auto max-w-2xl">
        <About source={source} />
        <Life />
      </div>
      <Footer />
    </>
  );
};
