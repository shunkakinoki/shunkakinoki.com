import type { FC } from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Newsletter } from "@/components/Newsletter";
import { Seo } from "@/components/Seo";

export const SubscribeScreen: FC = () => {
  return (
    <>
      <Seo title="Social" />
      <Header />
      <div className="flex justify-center items-start mx-auto max-w-2xl">
        <Newsletter />
      </div>
      <Footer />
    </>
  );
};
