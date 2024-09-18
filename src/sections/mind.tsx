import { MindMap } from "@/components/mind-map";
import { getCachedQueryDatabase } from "@/services/notion";
import { getTranslations } from "next-intl/server";
import { PageHeader, PageHeaderSubheading } from "../components/page-header";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

export interface MindProps {
  dateStart: string;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export async function Mind({ dateStart }: MindProps) {
  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------

  const t = await getTranslations();

  // ---------------------------------------------------------------------------
  // Services
  // ---------------------------------------------------------------------------

  const mindMap = (
    await getCachedQueryDatabase({
      // biome-ignore lint/style/useNamingConvention: <explanation>
      database_id: "be3e2449e1324b518f78c21e168f5a78",
      filter: {
        and: [
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
      !!db.properties["Total Lifted"]?.number ||
      //@ts-ignore
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      !!db.properties["Running"]?.number
    );
  });

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (mindMap.length === 0) {
    return null;
  }

  return (
    <section>
      <PageHeader>
        <PageHeaderSubheading>{t("Mind.title")}</PageHeaderSubheading>
      </PageHeader>
      <div className="mt-8 w-full flex-col space-y-3">
        {mindMap.length > 0 && mindMap[0] && <MindMap content={mindMap[0]} />}
      </div>
    </section>
  );
}
