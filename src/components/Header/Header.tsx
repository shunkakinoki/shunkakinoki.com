import Link, { LinkProps } from "next/link";
import s from "./Header.module.css";
import { useTheme } from "next-themes";

interface HeaderLinkProps extends LinkProps {
  children: string;
}

export function HeaderLink({ children, href }: HeaderLinkProps): JSX.Element {
  return (
    <li className="px-3 leading-5 text-left text-gray-400 align-baseline hover:text-gray-600">
      <Link href={href}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className="text-sm font-medium no-underline uppercase cursor-pointer ">
          {children}
        </a>
      </Link>
    </li>
  );
}

export default function Header(): JSX.Element {
  return (
    <div className="bg-white dark:bg-black">
      <header
        role="banner"
        className="box-border sticky z-30 flex items-center justify-between w-full max-w-3xl p-8 px-6 py-3 mx-auto my-0 mb-3 leading-5 text-gray-400 align-baseline transition ease-in sm:mb-6 sticky-nav md:my-8 bg-opacity-60"
      >
        <div className="items-center flex-grow flex-shrink-0 max-w-screen-sm align-baseline">
          <Link href="/">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              aria-current="page"
              className="text-xl font-medium leading-loose text-gray-400 no-underline align-baseline hover:text-gray-600"
            >
              shunkakinoki
            </a>
          </Link>
        </div>
        <nav className="flex-grow flex-shrink-0 block align-baseline">
          <ul className="flex items-center justify-end leading-5 ">
            <HeaderLink href="/about">About</HeaderLink>
            <HeaderLink href="/blog">Blog</HeaderLink>
            <HeaderLink href="/dashboard">Dashboard</HeaderLink>
          </ul>
        </nav>
      </header>
    </div>
  );
}
