import { History } from "@/sections/history";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

export async function generateMetadata({
  params: { locale },
}: { params: { locale: string } }): Promise<Metadata> {
  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------

  const t = await getTranslations({ locale });

  // ---------------------------------------------------------------------------
  // Return
  // ---------------------------------------------------------------------------

  return {
    title: t("history.title"),
    description: t("history.description"),
  };
}

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

// biome-ignore lint/style/noDefaultExport: <explanation>
export default function HistoryPage() {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return <History />;
}
