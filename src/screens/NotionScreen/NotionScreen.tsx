import type { FC } from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Notion } from "@/components/Notion";
import type { Props as NotionProps } from "@/components/Notion";
import { Seo } from "@/components/Seo";

export type Props = NotionProps & { locale?: string };

export const NotionScreen: FC<Props> = ({ content, blocks, locale }) => {
  return (
    <>
      <Seo
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        /* @ts-ignore */
        title={content.properties.Name?.title[0]?.plain_text || "Blog"}
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        /* @ts-ignore */
        date={new Date(content.properties.Date?.date?.start).toLocaleString(
          locale,
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          },
        )}
      />
      <Header />
      <div className="flex flex-col justify-center items-start mx-auto max-w-2xl">
        <Notion content={content} blocks={blocks} />
      </div>
      <Footer />
    </>
  );
};
