import type { FC } from "react";

import type { Props as CreditsProps } from "@/components/Credits";
import { Credits } from "@/components/Credits";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export type Props = CreditsProps;

export const CreditsScreen: FC<Props> = ({ source }) => {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-start mx-auto max-w-2xl">
        <Credits source={source} />
      </div>
      <Footer />
    </>
  );
};
