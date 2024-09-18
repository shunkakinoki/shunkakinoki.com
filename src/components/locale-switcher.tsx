// Copyright 2023-2024 Shun Kakinoki.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
