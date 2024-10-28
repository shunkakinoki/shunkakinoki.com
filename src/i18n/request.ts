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

import { routing } from "@/i18n/routing";
import { getRequestConfig } from "next-intl/server";

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

// biome-ignore lint/suspicious/useAwait: <explanation>
export const now = async () => {
  "use cache";

  return new Date();
};

// biome-ignore lint/style/noDefaultExport: <explanation>
export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that the incoming locale is valid
  // biome-ignore lint/complexity/useSimplifiedLogicExpression: <explanation>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    messages: (await import(`../../messages/${locale}.json`)).default,
    now: await now(),
  };
});
