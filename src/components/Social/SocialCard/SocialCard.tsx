import { BadgeCheckIcon } from "@heroicons/react/solid";
import type { ReactNode, FC } from "react";

import { shunkakinoki } from "@/const";

export interface Props {
  children: ReactNode;
  isPriority?: boolean;
  href: string;
  title: string;
  username?: string;
}

export const SocialCard: FC<Props> = ({
  children,
  isPriority = false,
  href,
  title,
  username = `@${shunkakinoki}`,
}) => {
  return (
    <li className="group col-span-1">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <div className="flex items-center leading-5 text-left no-underline cursor-pointer">
          <div className="box-border flex flex-shrink-0 justify-center mr-4 w-8 text-3xl text-left text-gray-500 group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-gray-200">
            {children}
          </div>
          <div className="overflow-hidden text-left cursor-pointer">
            <h4 className="inline-flex items-center text-sm font-medium leading-normal text-gray-500 group-hover:text-gray-800 dark:text-gray-300 dark:group-hover:text-gray-100">
              {title}
              {isPriority && (
                <span className="pl-2 text-green-400 dark:text-green-300">
                  <BadgeCheckIcon className="w-4 h-4" />
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
};
