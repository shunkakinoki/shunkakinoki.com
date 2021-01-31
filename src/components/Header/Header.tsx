import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import Link, { LinkProps } from "next/link";

import s from "./Header.module.css";

import DarkModeButton from "@/components/Header/DarkModeButton";
import MenuButton from "@/components/Header/MenuButton";

const MobileMenu = dynamic(() => import("@/components/Header/MobileMenu"));

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
  const { t } = useTranslation();

  return (
    <nav className={s.glass}>
      <header
        role="banner"
        className="sticky z-30 flex items-center justify-between w-full max-w-3xl p-8 px-6 py-6 mx-auto my-6 text-gray-400 align-baseline box-border leading-5 transition ease-in md:my-8 bg-opacity-60 md:py-6 sm:py-4"
      >
        <div className="flex items-center flex-grow flex-shrink-0 align-baseline max-w-screen-sm">
          <span className="pr-2 sm:pr-3 md:pr-5">
            <DarkModeButton />
          </span>
          <Link href="/">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              aria-current="page"
              className="text-xl text-transparent lg:text-2xl hover:underline bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
            >
              shunkakinoki
            </a>
          </Link>
        </div>
        <div className="-my-2 -mr-2 md:hidden">
          <MenuButton />
        </div>
        <MobileMenu />
        <nav className="flex-grow flex-shrink-0 hidden align-baseline md:block">
          <ul className="flex items-center justify-end leading-5">
            <HeaderLink href="/about">{t("common:header.about")}</HeaderLink>
            <HeaderLink href="/blog">{t("common:header.blog")}</HeaderLink>
            <HeaderLink href="/dashboard">
              {t("common:header.dashboard")}
            </HeaderLink>
          </ul>
        </nav>
      </header>
    </nav>
  );
}
