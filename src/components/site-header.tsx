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

import { CommandMenu } from "@/components/command-menu";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { siteConfig } from "@/config/site";
import { ButtonIcon } from "@lightdotso/ui/components/button-icon";
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function SiteHeader() {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <header className="sticky top-0 z-50 w-full border-border/40 border-b bg-opacity-95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-screen-md items-center px-2">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <nav className="flex items-center">
            <ButtonIcon variant="ghost" asChild>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <GitHubLogoIcon className="h-4 w-4 fill-current" />
                <span className="sr-only">GitHub</span>
              </a>
            </ButtonIcon>
            <ButtonIcon variant="ghost" asChild>
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
              >
                <TwitterLogoIcon className="h-4 w-4 fill-current" />
                <span className="sr-only">Twitter</span>
              </a>
            </ButtonIcon>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
