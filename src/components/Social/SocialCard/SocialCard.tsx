import {ReactNode} from "react";

import {SocialLinks} from "@/const";
import {Check} from "@/icons";

export interface Props {
  children: ReactNode;
  isPriority?: boolean;
  href: string;
  title: string;
  username?: string;
}

export default function SocialCard({
  children,
  isPriority = false,
  href,
  title,
  username = `@${SocialLinks.shunkakinoki}`,
}: Props): JSX.Element {
  return (
    <li className="col-span-1 group">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <div className="flex items-center text-left no-underline cursor-pointer leading-5">
          <div className="flex justify-center flex-shrink-0 w-8 mr-4 text-3xl text-left text-gray-500 box-border group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-gray-200">
            {children}
          </div>
          <div className="overflow-hidden text-left cursor-pointer">
            <h4 className="inline-flex items-center text-sm font-medium leading-normal text-gray-500 group-hover:text-gray-800 dark:text-gray-300 dark:group-hover:text-gray-100">
              {title}
              {isPriority && (
                <span className="pl-2 text-green-400 dark:text-green-300">
                  <Check />
                </span>
              )}
            </h4>
            <p className="block w-full text-xs text-gray-600 truncate flex-nowrap whitespace-nowrap group-hover:underline group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-200">
              {username}
            </p>
          </div>
        </div>
      </a>
    </li>
  );
}
