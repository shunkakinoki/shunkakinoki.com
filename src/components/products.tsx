import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

import { queryDatabase } from "@/services/notion";
import { SectionHeaderHeading } from "./section-header";

type ProductsProps = {
  isPartial?: boolean;
};

export async function Products({ isPartial }: ProductsProps) {
  const res = await queryDatabase({
    database_id: "bd49167ff0b140aea87c4548f3fbbc82",
    sorts: [
      isPartial
        ? {
            property: "Created At",
            direction: "descending",
          }
        : {
            property: "Name",
            direction: "ascending",
          },
    ],
  });

  return (
    <section>
      <SectionHeaderHeading>Products</SectionHeaderHeading>
      <div className="flex-col items-center px-6 mt-3 w-full sm:px-4 md:px-0">
        <ul className="grid grid-cols-1 gap-3">
          {res.results.slice(0, isPartial ? 3 : -1).map((product) => (
            <ProductCard
              key={product.id}
              // @ts-ignore
              name={product.properties.Name?.title[0]?.plain_text || ""}
              description={
                // @ts-ignore
                product.properties.Description?.rich_text[0].plain_text || ""
              }
              //@ts-ignore
              href={product.properties.Link?.url || ""}
            >
              {/* @ts-ignore */}
              {product.properties.Image?.files[0] ? (
                <img
                  className="w-full h-full rounded-md"
                  //@ts-ignore
                  alt={product.properties.Name?.title[0]?.plain_text || ""}
                  //@ts-ignore
                  src={product.properties.Image?.files[0].file.url}
                />
              ) : (
                <></>
              )}
            </ProductCard>
          ))}
        </ul>
      </div>
    </section>
  );
}

interface ProductCardProps {
  children?: JSX.Element;
  description: string;
  name: string;
  href?: string;
}

export function ProductCard({
  children,
  description,
  name,
  href,
}: ProductCardProps) {
  return (
    <li className="group col-span-1 hover:bg-gray-50 dark:bg-black dark:hover:bg-gray-900 rounded-lg border dark:border-gray-300 shadow-lg">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="flex items-center p-4 sm:px-6">
          <div className="hidden shrink-0 md:inline-block md:pr-2">
            <div className="w-16 h-16">{children}</div>
          </div>
          <div className="grow mr-1 ml-3">
            <h4 className="text-lg font-medium tracking-tight text-gray-900 dark:text-gray-100">
              {name}
            </h4>
            <p className="text-sm leading-5 text-gray-600 dark:text-gray-300 line-clamp-3">
              {description}
            </p>
          </div>
          <div className="shrink-0 text-gray-500">
            <ArrowUpRightIcon className="w-6 h-6" />
          </div>
        </div>
      </a>
    </li>
  );
}
