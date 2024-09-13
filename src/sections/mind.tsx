import { MindMap } from "@/components/mind-map";
import { queryDatabase } from "@/services/notion";
import { getTranslations } from "next-intl/server";
import { PageHeader, PageHeaderHeading } from "../components/page-header";

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
    await queryDatabase({
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
      !!db.properties["Total Lifted"]?.number
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
        <PageHeaderHeading>{t("Mind.title")}</PageHeaderHeading>
      </PageHeader>
      <div className="mt-8 w-full flex-col space-y-3">
        {mindMap.map((page) => {
          return <MindMap content={page} />;
        })}
      </div>
    </section>
  );
}
