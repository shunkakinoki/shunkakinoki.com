import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import type { LinkProps } from "next/link";
import Link from "next/link";
import type { FC } from "react";

import s from "./Header.module.css";

import { DarkModeButton } from "@/components/Header/DarkModeButton";
import { MenuButton } from "@/components/Header/MenuButton";

const MobileMenu = dynamic(() => {
  return import("@/components/Header/MobileMenu").then(m => {
    return m.MobileMenu;
  });
});

interface HeaderLinkProps extends LinkProps {
  children: string;
}

export const HeaderLink: FC<HeaderLinkProps> = ({ children, href }) => {
  return (
    <li className="px-3 leading-5 text-left text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 align-baseline">
      <Link href={href}>
        <a className="text-sm md:text-base lg:text-lg font-medium no-underline cursor-pointer">
          {children}
        </a>
      </Link>
    </li>
  );
};

export const Header: FC = () => {
  const { t } = useTranslation();

  return (
    <nav className={s.glass}>
      <header
        role="banner"
        className="box-border flex sticky z-30 justify-between items-center p-8 py-6 sm:py-4 md:py-6 px-6 my-6 md:my-8 mx-auto w-full max-w-3xl leading-5 text-gray-400 align-baseline bg-opacity-60 transition ease-in"
      >
        <div className="flex flex-grow flex-shrink-0 items-center max-w-screen-sm align-baseline">
          <Link href="/">
            <a aria-current="page" className="group items-center">
              <span
                className="pr-2 sm:pr-3 md:pr-5 text-3xl group-hover:opacity-90"
                role="img"
                aria-label="Logo"
              >
                🦄
              </span>
              <span className="text-xl lg:text-2xl text-transparent group-hover:underline bg-clip-text bg-gradient-to-r from-green-300 group-hover:from-green-200 via-blue-500 group-hover:via-blue-400 to-purple-600 group-hover:to-purple-400">
                shunkakinoki
              </span>
            </a>
          </Link>
        </div>
        <div className="md:hidden -my-2 -mr-2">
          <MenuButton />
        </div>
        <MobileMenu />
        <nav className="hidden md:block flex-grow flex-shrink-0 align-baseline">
          <ul className="flex justify-end items-center leading-5">
            <HeaderLink href="/about">{t("common:header.about")}</HeaderLink>
            <HeaderLink href="/blog">{t("common:header.blog")}</HeaderLink>
            <HeaderLink href="/dashboard">
              {t("common:header.dashboard")}
            </HeaderLink>
          </ul>
        </nav>
        <span className="pr-2 sm:pr-3 md:pr-5">
          <DarkModeButton />
        </span>
      </header>
    </nav>
  );
};
