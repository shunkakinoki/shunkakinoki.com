import { Checklist } from "@/components/check-list";
import { getCachedQueryDatabase } from "@/services/notion";
import { getTranslations } from "next-intl/server";
import { PageHeader, PageHeaderSubheading } from "../components/page-header";

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
    await getCachedQueryDatabase({
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
  ).results;

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (checklist.length === 0) {
    return null;
  }

  return (
    <section>
      <PageHeader>
        <PageHeaderSubheading>{t("Check.title")}</PageHeaderSubheading>
      </PageHeader>
      <div className="mt-8 w-full flex-col space-y-3">
        {checklist.length > 0 && checklist[0] && (
          <Checklist content={checklist[0]} />
        )}
      </div>
    </section>
  );
}
