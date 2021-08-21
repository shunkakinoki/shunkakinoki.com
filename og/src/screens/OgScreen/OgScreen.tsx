import useTranslation from "next-translate/useTranslation";
import type { FC } from "react";

import { Config } from "@/components/Config";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Seo } from "@/components/Seo";
import { Viewer } from "@/components/Viewer";
import { useIsMounted } from "@/hooks/useIsMounted";

export const OgScreen: FC = () => {
  const isMounted = useIsMounted();
  const { t } = useTranslation();

  return (
    <>
      <Seo title="OG" />
      <Header />
      <main className="px-6 pb-20 mx-auto w-full max-w-6xl">
        <header className="mt-20 mb-12 space-y-6 text-center">
          <h1 className="text-5xl font-bold text-black dark:text-white">
            {t("common:header.og")}
          </h1>
        </header>
        {isMounted && (
          <section className="grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-y-8">
            <Config />
            <Viewer />
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};
