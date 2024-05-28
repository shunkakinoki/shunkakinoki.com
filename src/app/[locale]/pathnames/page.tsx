import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PathnamesProps = {
  params: { locale: string };
};

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default function PathnamesPage({ params: { locale } }: PathnamesProps) {
  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------

  // Enable static rendering
  unstable_setRequestLocale(locale);

  const t = useTranslations();

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <>
      <div className="max-w-[490px]">
        {t.rich("pathnames.description", {
          p: (chunks) => <p className="mt-4">{chunks}</p>,
          code: (chunks) => (
            <code className="font-mono text-white">{chunks}</code>
          ),
        })}
      </div>
    </>
  );
}
