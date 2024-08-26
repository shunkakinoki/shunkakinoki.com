import { socialConfig, socialPriorityConfig } from "@/config/social";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import type { IconProps } from "@radix-ui/react-icons/dist/types";
import { useTranslations } from "next-intl";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import type { IconType } from "react-icons/lib";
import { PageHeader, PageHeaderHeading } from "./page-header";
import { SectionHeaderHeading } from "./section-header";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

export interface SocialProps {
  isPartial?: boolean;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function Social({ isPartial = false }: SocialProps) {
  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------

  const t = useTranslations();

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <section>
      {isPartial ? (
        <SectionHeaderHeading>{t("social.title")}</SectionHeaderHeading>
      ) : (
        <PageHeader>
          <PageHeaderHeading>{t("social.title")}</PageHeaderHeading>
        </PageHeader>
      )}
      <div className="mt-3 w-full flex-col items-center">
        <ul className="my-2 mt-4 grid w-full grid-cols-2 gap-2 sm:grid-cols-3">
          {(isPartial ? socialPriorityConfig : socialConfig).map((social) => (
            <SocialCard
              key={social.name}
              isPriority={social.isPriority}
              title={social.name}
              icon={social.icon}
              href={social.href}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

export interface SocialCardProps {
  icon:
    | ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
    | IconType;
  isPriority?: boolean;
  href: string;
  title: string;
  username?: string;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function SocialCard({
  isPriority = false,
  href,
  title,
  username = "@shunkakinoki",
  ...props
}: SocialCardProps) {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <li className="group col-span-1">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <div className="flex cursor-pointer items-center text-left leading-5 no-underline">
          <div className="mr-4 box-border flex w-8 shrink-0 justify-center text-left text-3xl text-text-weak group-hover:text-text-stronger">
            <props.icon className="h-6 w-6" />
          </div>
          <div className="cursor-pointer overflow-hidden text-left">
            <h4 className="inline-flex items-center font-medium text-sm text-text-weak leading-normal group-hover:text-text-stronger">
              {title}
              {isPriority && (
                <span className="pl-2 text-text-success-weak group-hover:text-text-success">
                  <CheckBadgeIcon className="h-4 w-4" />
                </span>
              )}
            </h4>
            <p className="block w-full flex-nowrap truncate whitespace-nowrap text-text-weak text-xs group-hover:text-text-strong group-hover:underline">
              {username}
            </p>
          </div>
        </div>
      </a>
    </li>
  );
}
