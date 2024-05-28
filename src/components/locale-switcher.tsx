"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { locales } from "@/config";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export default function LocaleSwitcher() {
  // ---------------------------------------------------------------------------
  // Hooks
  // ---------------------------------------------------------------------------

  const t = useTranslations();
  const locale = useLocale();
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
