import { Link } from "@/navigation";
import { queryDatabase } from "@/services/notion";
import { useTranslations } from "next-intl";
import { PageHeader, PageHeaderHeading } from "./page-header";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export async function Journal() {
  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------

  const t = useTranslations();

  // ---------------------------------------------------------------------------
  // Service
  // ---------------------------------------------------------------------------

  const res = (
    await queryDatabase({
      // biome-ignore lint/style/useNamingConvention: <explanation>
      database_id: "badf29d87d2f4e03b2c5451a627d8618",
    })
  ).results.filter((db) => {
    return (
      //@ts-ignore
      !!db.properties.Date?.date
    );
  });

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <section>
      <PageHeader>
        <PageHeaderHeading>{t("sections.journal")}</PageHeaderHeading>
      </PageHeader>
      <div className="w-full flex-col space-y-3">
        {res.map((page) => {
          // @ts-ignore
          const date = new Date(page.properties.Date.date.start).toLocaleString(
            "en",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            },
          );
          return (
            <div key={page.id} className="flex space-x-4">
              <Link
                // @ts-expect-error
                href={`/${page.id}`}
                className="line-clamp-1 flex grow items-center font-extrabold text-warmGray-800 hover:text-gray-700 hover:underline dark:text-gray-100 dark:hover:text-white"
              >
                <div className="text-xl md:text-2xl">
                  {/* @ts-ignore */}
                  {page.properties.Name?.title[0]?.plain_text || ""}
                </div>
              </Link>
              <div className="flex flex-none items-center justify-center text-gray-700 text-sm dark:text-gray-300">
                {date}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
