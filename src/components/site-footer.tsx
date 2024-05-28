import { navConfig } from "@/config/nav";
import { socialPriorityConfig } from "@/config/social";

export function SiteFooter() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="mx-auto max-w-screen-md overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {navConfig.map((item) => (
            <div key={item.title} className="pb-6">
              <a
                href={item.href}
                className="text-sm leading-6 text-foreground/60 hover:text-foreground/80"
              >
                {item.title}
              </a>
            </div>
          ))}
        </nav>
        <div className="mt-6 flex justify-center space-x-5">
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
        <p className="mt-6 text-center text-xs leading-5 text-foreground/70">
          &copy; {new Date().getFullYear()} Shun Kakinoki. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
