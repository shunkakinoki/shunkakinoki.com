import Link, { LinkProps } from "next/link";
import s from "./Header.module.css";
import DarkModeButton from "@/components/Header/DarkModeButton";

interface HeaderLinkProps extends LinkProps {
  children: string;
}

export function HeaderLink({ children, href }: HeaderLinkProps): JSX.Element {
  return (
    <li className="px-3 leading-5 text-left text-gray-500 align-baseline hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-200">
      <Link href={href}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className="text-xs font-medium no-underline uppercase cursor-pointer md:text-sm lg:text-md">
          {children}
        </a>
      </Link>
    </li>
  );
}

export default function Header(): JSX.Element {
  return (
    <div className={(s.nav, "bg-white dark:bg-black")}>
      <header
        role="banner"
        className="box-border sticky z-30 flex items-center justify-between w-full max-w-3xl p-8 px-6 py-3 mx-auto my-0 mb-3 leading-5 text-gray-400 align-baseline transition ease-in sm:mb-6 sticky-nav md:my-8 bg-opacity-60"
      >
        <div className="flex items-center flex-grow flex-shrink-0 max-w-screen-sm align-baseline">
          <span className="pr-2 sm:pr-3 md:pr-5">
            <DarkModeButton></DarkModeButton>
          </span>
          <Link href="/">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              aria-current="page"
              className="text-base text-gray-500 lg:text-2xl md:text-xl hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
            >
              shunkakinoki
            </a>
          </Link>
        </div>
        <nav className="flex-grow flex-shrink-0 block align-baseline">
          <ul className="flex items-center justify-end leading-5">
            <HeaderLink href="/about">About</HeaderLink>
            <HeaderLink href="/blog">Blog</HeaderLink>
            <HeaderLink href="/dashboard">Dashboard</HeaderLink>
          </ul>
        </nav>
      </header>
    </div>
  );
}
