import { getCachedQueryDatabase } from "@/services/notion";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { getTranslations } from "next-intl/server";
import { PageHeader, PageHeaderHeading } from "../components/page-header";
import { SectionHeaderHeading } from "../components/section-header";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type ProductsProps = {
  isPartial?: boolean;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export async function Products({ isPartial }: ProductsProps) {
  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------

  const t = await getTranslations();

  // ---------------------------------------------------------------------------
  // Services
  // ---------------------------------------------------------------------------

  const res = await getCachedQueryDatabase({
    // biome-ignore lint/style/useNamingConvention: <explanation>
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

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <section>
      {isPartial ? (
        <SectionHeaderHeading>{t("products.title")}</SectionHeaderHeading>
      ) : (
        <PageHeader>
          <PageHeaderHeading>{t("products.title")}</PageHeaderHeading>
        </PageHeader>
      )}
      <div className="mt-3 w-full flex-col items-center">
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
                  className="h-full w-full rounded-md"
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

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface ProductCardProps {
  // biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
  children?: JSX.Element;
  description: string;
  name: string;
  href?: string;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function ProductCard({
  children,
  description,
  name,
  href,
}: ProductCardProps) {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <li className="group col-span-1 rounded-lg border border-border-strong bg-background-strong shadow-lg hover:bg-background-stronger">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="flex items-center p-4 sm:px-6">
          <div className="inline-block shrink-0 md:pr-2">
            <div className="h-16 w-16">{children}</div>
          </div>
          <div className="mr-1 ml-3 grow">
            <h4 className="font-medium text-lg text-text tracking-tight">
              {name}
            </h4>
            <p className="line-clamp-3 text-sm text-text-weak leading-5">
              {description}
            </p>
          </div>
          <div className="shrink-0 text-text">
            <ArrowUpRightIcon className="h-6 w-6" />
          </div>
        </div>
      </a>
    </li>
  );
}
