import type { FC } from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { History } from "@/components/History";
import { Seo } from "@/components/Seo";

export const HistoryScreen: FC = () => {
  return (
    <>
      <Seo title="History" />
      <Header />
      <div className="flex justify-center items-start mx-auto max-w-2xl">
        <History />
      </div>
      <Footer />
    </>
  );
};
