import type { FC } from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { History } from "@/components/History";

export const HistoryScreen: FC = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center items-start mx-auto max-w-2xl">
        <History />
      </div>
      <Footer />
    </>
  );
};
