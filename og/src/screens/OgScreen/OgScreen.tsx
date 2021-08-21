import type { FC } from "react";

import { Config } from "@/components/Config";
import { Seo } from "@/components/Seo";
import { Viewer } from "@/components/Viewer";
import { useIsMounted } from "@/hooks/useIsMounted";

export const OgScreen: FC = () => {
  const isMounted = useIsMounted();

  return (
    <>
      <Seo title="OG" />
      <main className="px-6 pb-20 mx-auto w-full max-w-6xl">
        <header className="mt-20 mb-12 space-y-6 text-center">
          <h1 className="text-5xl font-bold text-black dark:text-white">
            Open Graph Generation
          </h1>
        </header>
        {isMounted && (
          <section className="grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-y-8">
            <Config />
            <Viewer />
          </section>
        )}
      </main>
    </>
  );
};
