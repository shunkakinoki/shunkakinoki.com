import type { FC } from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { Props as NotionProps } from "@/components/Notion";
import { Notion } from "@/components/Notion";

export type Props = NotionProps;

export const NotionScreen: FC<Props> = ({ fullPage, recordMap }) => {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-start mx-auto max-w-2xl">
        <Notion fullPage={fullPage} recordMap={recordMap} />
      </div>
      <Footer />
    </>
  );
};
