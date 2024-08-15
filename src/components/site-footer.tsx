"use client";

import { navConfig } from "@/config/nav";
import { socialPriorityConfig } from "@/config/social";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import LocaleSwitcher from "./locale-switcher";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function SiteFooter() {
  // ---------------------------------------------------------------------------
  // Hooks
  // ---------------------------------------------------------------------------

  const pathname = usePathname();

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <footer>
      <div className="mx-auto max-w-screen-md overflow-hidden px-6 lg:px-4">
        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12 md:space-x-8"
          aria-label="Footer"
        >
          {navConfig.map((item) => (
            <div key={item.title} className="pb-6">
              <a
                href={item.href}
                className={cn(
                  "text-sm leading-6 hover:text-foreground/80",
                  pathname.endsWith(item.href)
                    ? "text-foreground"
                    : "text-foreground/60",
                )}
              >
                {item.title}
              </a>
            </div>
          ))}
        </nav>
        <div className="mt-8 flex justify-center space-x-5">
          {socialPriorityConfig.map((item) => (
            <a
              target="_blank"
              rel="noreferrer"
              key={item.name}
              href={item.href}
              className="text-foreground/60 hover:text-foreground/70"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="my-6 flex items-center justify-center space-x-2">
          <p className="text-foreground/70 text-sm leading-5">
            &copy; {new Date().getFullYear()} Shun Kakinoki. All rights
            reserved.
          </p>
          <LocaleSwitcher />
        </div>
      </div>
    </footer>
  );
}
