import type { FC } from "react";

import { Config } from "@/components/Config";
import { Viewer } from "@/components/Viewer";
import { useIsMounted } from "@/hooks/useIsMounted";

export const Index: FC = () => {
  const isMounted = useIsMounted();

  return (
    <>
      <main className="px-6 pb-20 mx-auto w-full max-w-6xl">
        <header className="mt-20 mb-12 space-y-6 text-center">
          <h1 className="text-5xl font-bold dark:text-white">
            Sentrei OG Image Generator
          </h1>
          <h2 className="text-xl text-gray-600 dark:text-gray-300">
            Dynamic open graph images for your website
          </h2>
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

export default Index;
