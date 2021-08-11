import clsx from "clsx";
import Link from "next/link";
import type { FC } from "react";

export interface Props {
  children: JSX.Element;
  color:
    | "blue"
    | "gray"
    | "green"
    | "indigo"
    | "pink"
    | "purple"
    | "red"
    | "yellow";
  name: string;
  hidden?: boolean;
  href: string;
}

export const LifeCard: FC<Props> = ({
  children,
  color,
  name,
  hidden = false,
  href,
}) => {
  return (
    <div
      className={clsx(
        "group relative p-6 bg-white hover:bg-gray-50 dark:bg-black dark:hover:bg-gray-900 sm:rounded-tr-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500",
        hidden && "block sm:hidden md:block",
      )}
    >
      <div>
        <span
          className={clsx(
            "inline-flex p-3 rounded-lg ring-4 ring-white dark:ring-black",
            color === "blue" &&
              "text-blue-700 dark:text-blue-50 bg-blue-50 dark:bg-blue-700",
            color === "gray" &&
              "text-gray-700 dark:text-gray-50 bg-gray-50 dark:bg-gray-700",
            color === "green" &&
              "text-green-700 dark:text-green-50 bg-green-50 dark:bg-green-700",
            color === "indigo" &&
              "text-indigo-700 dark:text-indigo-50 bg-indigo-50 dark:bg-indigo-700",
            color === "pink" &&
              "text-pink-700 dark:text-pink-50 bg-pink-50 dark:bg-pink-700",
            color === "purple" &&
              "text-purple-700 dark:text-purple-50 bg-purple-50 dark:bg-purple-700",
            color === "red" &&
              "text-red-700 dark:text-red-50 bg-red-50 dark:bg-red-700",
            color === "yellow" &&
              "text-yellow-700 dark:text-yellow-50 bg-yellow-50 dark:bg-yellow-700",
          )}
        >
          {children}
        </span>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-medium text-black group-hover:text-gray-600 dark:text-gray-300 dark:group-hover:text-gray-100">
          <Link href={href}>
            <a className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              {name}
            </a>
          </Link>
        </h3>
      </div>
      <span
        className="absolute top-6 right-6 text-gray-300 group-hover:text-gray-400 dark:text-gray-700 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
        </svg>
      </span>
    </div>
  );
};
