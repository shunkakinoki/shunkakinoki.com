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

import { navConfig } from "@/config/nav";
import { socialPriorityConfig } from "@/config/social";
import { cn } from "@/lib/utils";
import { ButtonIcon } from "@lightdotso/ui/components/button-icon";
import { usePathname } from "next/navigation";
import LocaleSwitcher from "./locale-switcher";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function SiteFooter() {
  // ---------------------------------------------------------------------------
  // Next Hooks
  // ---------------------------------------------------------------------------

  const pathname = usePathname();

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <footer className="bg-background-body">
      <div className="mx-auto max-w-screen-md overflow-hidden px-8">
        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12 md:space-x-8"
          aria-label="Footer"
        >
          {navConfig.map((item) => (
            <div key={item.title} className="pb-4">
              <a
                href={item.href}
                className={cn(
                  "text-sm leading-6 hover:text-text/80",
                  pathname.endsWith(item.href)
                    ? "font-medium text-text"
                    : "text-text/60",
                )}
              >
                {item.title}
              </a>
            </div>
          ))}
        </nav>
        <div className="mt-8 flex justify-center space-x-5">
          {socialPriorityConfig.map((item) => (
            <ButtonIcon variant="ghost" size="sm" asChild key={item.name}>
              <a
                target="_blank"
                rel="noreferrer"
                href={item.href}
                className="text-text/60 hover:text-text/70"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            </ButtonIcon>
          ))}
        </div>
        <div className="my-6 flex items-center justify-center space-x-4">
          <p className="text-sm text-text/70 leading-5">
            &copy; {new Date().getFullYear()} Shun Kakinoki. All rights
            reserved.
          </p>
          <LocaleSwitcher />
        </div>
      </div>
    </footer>
  );
}
