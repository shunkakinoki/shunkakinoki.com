import Link, { LinkProps } from "next/link";
import s from "./Header.module.css";
import DarkModeButton from "@/components/Header/DarkModeButton";

interface HeaderLinkProps extends LinkProps {
  children: string;
}

export function HeaderLink({ children, href }: HeaderLinkProps): JSX.Element {
  return (
    <li className="px-3 text-left text-gray-500 align-baseline leading-5 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
      <Link href={href}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className="text-sm font-medium no-underline cursor-pointer md:text-base lg:text-md">
          {children}
        </a>
      </Link>
    </li>
  );
}

export default function Header(): JSX.Element {
  return (
    <nav className={s.glass}>
      <header
        role="banner"
        className="sticky z-30 flex items-center justify-between w-full max-w-3xl p-8 px-6 py-3 mx-auto my-3 text-gray-400 align-baseline box-border leading-5 transition ease-in md:my-8 bg-opacity-60 md:py-6 sm:py-4"
      >
        <div className="flex items-center flex-grow flex-shrink-0 align-baseline max-w-screen-sm">
          <span className="pr-2 sm:pr-3 md:pr-5">
            <DarkModeButton />
          </span>
          <Link href="/">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              aria-current="page"
              className="text-base text-transparent lg:text-2xl md:text-xl hover:underline bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
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
    </nav>
  );
}
