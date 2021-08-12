import type { FC } from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Seo } from "@/components/Seo";
import { Social } from "@/components/Social";

export const SocialScreen: FC = () => {
  return (
    <>
      <Seo title="Social" />
      <Header />
      <div className="flex justify-center items-start mx-auto max-w-2xl">
        <Social />
      </div>
      <Footer />
    </>
  );
};
