import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import type { IconProps } from "@radix-ui/react-icons/dist/types";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import type { IconType } from "react-icons/lib";

import { socialConfig } from "@/config/social";
import { SectionHeaderHeading } from "./section-header";

export function Social() {
  return (
    <section>
      <SectionHeaderHeading>Social</SectionHeaderHeading>
      <div className="flex-col items-center px-6 mt-3 w-full sm:px-4 md:px-0">
        <ul className="grid grid-cols-2 gap-2 my-2 mt-4 w-full sm:grid-cols-3">
          {socialConfig.map((social) => (
            <SocialCard
              key={social.name}
              isPriority
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

export interface SocialCardProps {
  icon:
    | ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
    | IconType;
  isPriority?: boolean;
  href: string;
  title: string;
  username?: string;
}

export function SocialCard({
  isPriority = false,
  href,
  title,
  username = "@shunkakinoki",
  ...props
}: SocialCardProps) {
  return (
    <li className="group col-span-1">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <div className="flex items-center leading-5 text-left no-underline cursor-pointer">
          <div className="box-border flex shrink-0 justify-center mr-4 w-8 text-3xl text-left text-gray-500 group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-gray-200">
            <props.icon className="w-6 h-6" />
          </div>
          <div className="overflow-hidden text-left cursor-pointer">
            <h4 className="inline-flex items-center text-sm font-medium leading-normal text-gray-500 group-hover:text-gray-800 dark:text-gray-300 dark:group-hover:text-gray-100">
              {title}
              {isPriority && (
                <span className="pl-2 text-green-400 dark:text-green-300">
                  <CheckBadgeIcon className="w-4 h-4" />
                </span>
              )}
            </h4>
            <p className="block flex-nowrap w-full text-xs text-gray-600 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-200 group-hover:underline truncate whitespace-nowrap">
              {username}
            </p>
          </div>
        </div>
      </a>
    </li>
  );
}
