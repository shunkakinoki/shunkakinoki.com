import type { GetPageResponse } from "@notionhq/client/build/src/api-endpoints";
import Link from "next/link";
import type { FC } from "react";

export type Props = {
  database: GetPageResponse[];
  locale?: string;
};

export const Blog: FC<Props> = ({ database, locale }) => {
  return (
    <section className="px-3 w-full text-black dark:text-white">
      <div className="flex-col space-y-3 w-full">
        {database.map(page => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          const date = new Date(page.properties.Date.date.start).toLocaleString(
            locale,
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            },
          );
          return (
            <div key={page.id} className="flex space-x-4">
              <Link href={`/${page.id}`}>
                <a className="flex grow items-center font-extrabold text-warmGray-800 hover:text-coolGray-700 dark:text-coolGray-100 dark:hover:text-white hover:underline line-clamp-1">
                  <div className="text-xl md:text-2xl">
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    {page.properties.Name?.title[0]?.plain_text || ""}
                  </div>
                </a>
              </Link>
              <div className="flex flex-none justify-center items-center text-sm text-gray-700 dark:text-gray-300">
                {date}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
