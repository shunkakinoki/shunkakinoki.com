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

import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import {
  RocketLaunchIcon,
  ScaleIcon,
  VariableIcon,
} from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { SectionHeaderHeading } from "../components/section-header";

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const actions = [
  {
    title: "Cause",
    href: "/cause",
    icon: VariableIcon,
    iconBackground: "bg-pink-700",
  },
  {
    title: "Mission",
    href: "/mission",
    icon: RocketLaunchIcon,
    iconBackground: "bg-indigo-700",
  },
  {
    title: "Values",
    href: "/values",
    icon: ScaleIcon,
    iconBackground: "bg-red-700",
  },
];

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function Life() {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  const t = useTranslations();

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <section>
      <SectionHeaderHeading>{t("life.title")}</SectionHeaderHeading>
      <div className="divide-y divide-border-strong overflow-hidden rounded-lg border border-border-strong bg-background-strong shadow sm:grid sm:grid-cols-3 sm:gap-px sm:divide-x sm:divide-y-0">
        {actions.map((action, actionIdx) => (
          <div
            key={action.title}
            className={cn(
              actionIdx === 0 ? "sm:rounded-l-lg" : "",
              actionIdx === actions.length - 1 ? "sm:rounded-r-lg" : "",
              "group relative p-6 focus-within:ring-inset hover:bg-background-stronger",
            )}
          >
            <div>
              <span
                className={cn(
                  action.iconBackground,
                  "inline-flex rounded-lg p-3 text-white",
                )}
              >
                <action.icon className="h-6 w-6" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="font-semibold text-base text-text/80 leading-6">
                {/* @ts-expect-error */}
                <Link href={action.href} className="focus:outline-none">
                  {/* Extend touch target to entire panel */}
                  <span className="absolute inset-0" aria-hidden="true" />
                  {action.title}
                </Link>
              </h3>
            </div>
            <span
              className="pointer-events-none absolute top-6 right-6 text-text"
              aria-hidden="true"
            >
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
