import { unstable_setRequestLocale } from "next-intl/server";

import { Blog } from "@/components/blog";

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function BlogPage({
  params: { locale },
}: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  return <Blog locale={locale} />;
}
