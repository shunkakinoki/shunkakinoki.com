import { Checklist } from "@/components/check-list";
import { queryDatabase } from "@/services/notion";
import { getTranslations } from "next-intl/server";
import { PageHeader, PageHeaderHeading } from "../components/page-header";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

export interface CheckProps {
  dateStart: string;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export async function Check({ dateStart }: CheckProps) {
  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------

  const t = await getTranslations();

  // ---------------------------------------------------------------------------
  // Services
  // ---------------------------------------------------------------------------

  const checklist = (
    await queryDatabase({
      // biome-ignore lint/style/useNamingConvention: <explanation>
      database_id: "ccf0648ddaab42a38644f209e6cd641f",
      filter: {
        or: [
          {
            property: "Date",
            date: {
              equals: dateStart,
            },
          },
        ],
      },
    })
  ).results.filter((db) => {
    return (
      //@ts-ignore
      !!db.properties["Total Lifted"]?.number
    );
  });

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (checklist.length === 0) {
    return null;
  }

  return (
    <section>
      <PageHeader>
        <PageHeaderHeading>{t("Check.title")}</PageHeaderHeading>
      </PageHeader>
      <div className="mt-8 w-full flex-col space-y-3">
        {checklist.length > 0 && checklist[0] && (
          <Checklist content={checklist[0]} />
        )}
      </div>
    </section>
  );
}
