import type { MetadataRoute } from "next";
import { getTranslations } from "next-intl/server";

// -----------------------------------------------------------------------------
// Manifest
// -----------------------------------------------------------------------------

// biome-ignore lint/style/noDefaultExport: <explanation>
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const locale = "en";
  const t = await getTranslations({ locale });

  return {
    name: t("manifest.name"),
    // biome-ignore lint/style/useNamingConvention: <explanation>
    start_url: "/",
    // biome-ignore lint/style/useNamingConvention: <explanation>
    theme_color: "#101E33",
  };
}
