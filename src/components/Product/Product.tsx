import type { GetPageResponse } from "@notionhq/client/build/src/api-endpoints";
import clsx from "clsx";
import type { FC } from "react";

import { SwitchButton } from "@/common/Button";
import { SectionText } from "@/common/Text";
import { ProductCard } from "@/components/Product/ProductCard";

export type Props = {
  isPartial?: boolean;
  database: GetPageResponse[];
};

export const Product: FC<Props> = ({ isPartial = false, database }) => {
  const filteredDatabase = isPartial ? database.slice(0, 3) : database;

  return (
    <section key="product" className={clsx("mb-6 w-full", isPartial && "mt-6")}>
      <div className="px-3 md:px-0">
        <SectionText isPartial={isPartial}>Products</SectionText>
      </div>
      <div className="flex-col items-center px-6 sm:px-4 md:px-0 mt-3 w-full">
        <ul
          className={clsx(
            "grid grid-cols-1 gap-3",
            isPartial && "md:gap-3",
            !isPartial && "md:gap-6",
          )}
        >
          {filteredDatabase.map(page => {
            return (
              <ProductCard
                key={page.id}
                description={
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                  page.properties?.Description?.rich_text[0]?.plain_text || ""
                }
                name={
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                  page.properties.Name?.title[0]?.plain_text || ""
                }
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                href={page.properties.Link?.url ?? undefined}
              >
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                {page.properties.Image?.files[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="w-full h-full rounded-md"
                    alt="Product"
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    src={page.properties.Image?.files[0].file.url}
                  />
                ) : (
                  <></>
                )}
              </ProductCard>
            );
          })}
        </ul>
      </div>
      <div className="pt-3 my-3 w-full leading-5 text-center">
        <div className="flex justify-center w-full">
          <SwitchButton
            href={isPartial ? "/products" : "/#products"}
            type={isPartial ? "right" : "left"}
          />
        </div>
      </div>
    </section>
  );
};
