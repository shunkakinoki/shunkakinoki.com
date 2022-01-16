import { ExternalLinkIcon } from "@heroicons/react/outline";
import type { FC } from "react";

export interface Props {
  children?: JSX.Element;
  description: string;
  name: string;
  href?: string;
}

export const ProductCard: FC<Props> = ({
  children,
  description,
  name,
  href,
}) => {
  return (
    <li className="group col-span-1 hover:bg-gray-50 dark:bg-black dark:hover:bg-gray-900 rounded-lg border dark:border-gray-300 shadow-lg">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="flex items-center p-4 sm:px-6">
          <div className="hidden shrink-0 md:inline-block md:pr-2">
            <div className="w-16 h-16">{children}</div>
          </div>
          <div className="grow mr-1 ml-3">
            <h4 className="text-lg font-medium tracking-tight text-gray-900 dark:text-gray-100">
              {name}
            </h4>
            <p className="text-sm leading-5 text-gray-600 dark:text-gray-300 line-clamp-3">
              {description}
            </p>
          </div>
          <div className="shrink-0 text-gray-500">
            <ExternalLinkIcon className="w-6 h-6" />
          </div>
        </div>
      </a>
    </li>
  );
};
