"use client";

import { locales } from "@/config";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@lightdotso/ui/components/select";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

// biome-ignore lint/style/noDefaultExport: <explanation>
export default function LocaleSwitcher() {
  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------

  const t = useTranslations();
  const locale = useLocale();

  // ---------------------------------------------------------------------------
  // Hooks
  // ---------------------------------------------------------------------------

  const router = useRouter();

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <Select onValueChange={(v) => router.push(`/${v}`)}>
      <SelectTrigger className="max-w-24">
        <SelectValue placeholder={t(`locale.options.${locale}`)} />
      </SelectTrigger>
      <SelectContent defaultValue={locale}>
        <SelectGroup>
          <SelectLabel>{t("locale.label")}</SelectLabel>
          {locales.map((cur) => (
            <SelectItem key={cur} value={cur}>
              {t(`locale.options.${cur}`, { locale: cur })}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
