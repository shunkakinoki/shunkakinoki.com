import { Blog } from "@/components/blog";
import { unstable_setRequestLocale } from "next-intl/server";

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

// biome-ignore lint/style/noDefaultExport: <explanation>
// biome-ignore lint/suspicious/useAwait: <explanation>
export default async function BlogPage({
  params: { locale },
}: { params: { locale: string } }) {
  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------

  unstable_setRequestLocale(locale);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return <Blog locale={locale} />;
}
