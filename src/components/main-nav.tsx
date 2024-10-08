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

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { LightLogo } from "@lightdotso/svg";
import { usePathname } from "next/navigation";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function MainNav() {
  // ---------------------------------------------------------------------------
  // Next Hooks
  // ---------------------------------------------------------------------------

  const pathname = usePathname();

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <LightLogo className="h-5 w-5" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href="/about"
          className={cn(
            "transition-colors hover:text-text/80",
            pathname.endsWith("/about")
              ? "font-medium text-text"
              : "text-text/60",
          )}
        >
          About
        </Link>
        <Link
          href="/blog"
          className={cn(
            "transition-colors hover:text-text/80",
            pathname?.endsWith("/blog")
              ? "font-medium text-text"
              : "text-text/60",
          )}
        >
          Blog
        </Link>
        <Link
          href="/dashboard"
          className={cn(
            "transition-colors hover:text-text/80",
            pathname?.endsWith("/dashboard")
              ? "font-medium text-text"
              : "text-text/60",
          )}
        >
          Dashboard
        </Link>
      </nav>
    </div>
  );
}
