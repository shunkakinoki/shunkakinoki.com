import type { LinkProps } from "next/link";
import Link from "next/link";
import type { FC } from "react";

interface Props extends LinkProps {
  children: string;
}

export const LinkButton: FC<Props> = ({ children }) => {
  return (
    <Link href="/">
      <a className="inline-flex items-center py-3 px-6 text-base font-medium text-indigo-700 dark:text-indigo-100 dark:hover:text-indigo-50 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-600 dark:hover:bg-indigo-400 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        {children}
      </a>
    </Link>
  );
};
