import Link, { LinkProps } from "next/link";

interface Props extends LinkProps {
  children: string;
}

export default function LinkButton({ children }: Props): JSX.Element {
  return (
    <Link href="/">
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="inline-flex items-center px-6 py-3 text-base font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-600 dark:text-indigo-100 dark:hover:bg-indigo-400 dark:hover:text-indigo-50">
        {children}
      </a>
    </Link>
  );
}
