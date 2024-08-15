import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import type { FC } from "react";

export interface Props {
  // biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
  children: JSX.Element;
  href?: string;
  number: number | undefined;
  title: string;
}

export const DashboardCard: FC<Props> = ({ children, href, number, title }) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800">
      <a
        href={href || "#"}
        target={href ? "_blank" : undefined}
        rel={href ? "noopener noreferrer" : undefined}
        className="block"
      >
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md bg-indigo-500 p-3">
              {children}
            </div>
            <div className="ml-5 w-0 flex-1">
              <dt className="truncate font-medium text-gray-500 text-sm dark:text-gray-400">
                {title}
              </dt>
              <dd className="flex items-baseline">
                {number ? (
                  <div className="font-semibold text-2xl text-gray-900 dark:text-gray-300">
                    {number.toLocaleString()}
                  </div>
                ) : (
                  <div className="h-8 w-9/12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                )}
              </dd>
            </div>
            {href ? (
              <div className="flex-shrink-0 text-white">
                <ArrowTopRightOnSquareIcon className="h-6 w-6" />
              </div>
            ) : null}
          </div>
        </div>
      </a>
    </div>
  );
};
