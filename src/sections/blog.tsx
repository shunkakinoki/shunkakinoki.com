import { Link } from "@/navigation";
import { queryDatabase } from "@/services/notion";
import { getTranslations } from "next-intl/server";
import { PageHeader, PageHeaderHeading } from "../components/page-header";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

export interface BlogProps {
  locale: string;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export async function Blog({ locale }: BlogProps) {
  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------

  const t = await getTranslations();

  // ---------------------------------------------------------------------------
  // Services
  // ---------------------------------------------------------------------------

  const res = (
    await queryDatabase({
      // biome-ignore lint/style/useNamingConvention: <explanation>
      database_id: "e4ef762ca07f465e8f5cce906732140b",
      filter: {
        and: [
          {
            property: "Published",
            checkbox: {
              equals: true,
            },
          },
          {
            property: "Locale",
            select: {
              equals: locale,
            },
          },
        ],
      },
    })
  ).results.filter((db) => {
    return (
      //@ts-ignore
      !!db.properties.Date?.date &&
      //@ts-ignore
      !!db.properties.Published.checkbox &&
      //@ts-ignore
      !!db.properties.Locale?.select
    );
  });

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <section>
      <PageHeader>
        <PageHeaderHeading>{t("blog.title")}</PageHeaderHeading>
      </PageHeader>
      <div className="mt-8 w-full flex-col space-y-3">
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
                className="line-clamp-1 flex grow items-center font-extrabold text-text hover:text-text-weak hover:underline"
              >
                <div className="text-xl md:text-2xl">
                  {/* @ts-ignore */}
                  {page.properties.Name?.title[0]?.plain_text || ""}
                </div>
              </Link>
              <div className="flex flex-none items-center justify-center text-sm text-text-weak">
                {date}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
