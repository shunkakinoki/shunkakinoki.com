import { locales } from "@/config";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

// biome-ignore lint/style/noDefaultExport: <explanation>
export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
