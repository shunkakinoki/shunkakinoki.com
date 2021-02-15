import clsx from "clsx";
import Link from "next/link";

interface Props {
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

export default function CoreCard({
  children,
  color,
  name,
  hidden = false,
  href,
}: Props): JSX.Element {
  return (
    <div
      className={clsx(
        "flex flex-col group relative p-6 bg-white hover:bg-gray-50 dark:bg-black dark:hover:bg-gray-900 sm:rounded-tr-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500",
        hidden && "block sm:hidden md:block"
      )}
    >
      <div className="flex justify-center w-full">
        <div className="flex items-center justify-center w-12 h-12 text-white rounded-md">
          <span
            className={clsx(
              "inline-flex p-3 rounded-lg ring-4 ring-white dark:ring-black",
              color === "blue" &&
                "text-blue-50 bg-blue-500 dark:text-blue-900 dark:bg-blue-300",
              color === "indigo" &&
                "text-indigo-50 bg-indigo-500 dark:text-indigo-900 dark:bg-indigo-300",
              color === "purple" &&
                "text-purple-50 bg-purple-500 dark:text-purple-900 dark:bg-purple-3000"
            )}
          >
            {children}
          </span>
        </div>
      </div>
      <div className="mt-5">
        <div className="text-lg font-semibold text-center text-black dark:text-gray-300">
          <Link href={href}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              {name}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
