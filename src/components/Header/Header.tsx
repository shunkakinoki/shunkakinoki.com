import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import type { LinkProps } from "next/link";
import Link from "next/link";
import type { FC } from "react";

import s from "./Header.module.css";

import { DarkModeButton } from "@/components/Header/DarkModeButton";
import { MenuButton } from "@/components/Header/MenuButton";

const MobileMenu = dynamic(async () => {
  const m = await import("@/components/Header/MobileMenu");
  return m.MobileMenu;
});

interface HeaderLinkProps extends LinkProps {
  children: string;
}

export const HeaderLink: FC<HeaderLinkProps> = ({ children, href }) => {
  return (
    <li className="px-3 leading-5 text-left text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 align-baseline">
      <Link href={href}>
        <a className="text-sm font-medium no-underline cursor-pointer md:text-base lg:text-lg">
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
        className="box-border flex sticky z-30 justify-between items-center p-8 my-6 mx-auto w-full max-w-3xl leading-5 text-gray-400 align-baseline bg-inherit/60 transition ease-in sm:py-4 md:py-6 md:my-8"
      >
        <div className="flex grow shrink-0 items-center max-w-screen-sm align-baseline">
          <Link href="/">
            <a aria-current="page" className="group">
              <span
                className="pr-2 text-3xl group-hover:opacity-60 sm:pr-3 md:pr-5"
                role="img"
                aria-label="Logo"
              >
                🦄
              </span>
              <span className="text-xl text-transparent group-hover:underline bg-clip-text bg-gradient-to-r from-green-300 group-hover:from-green-200 via-blue-500 group-hover:via-blue-400 to-purple-600 group-hover:to-purple-400 lg:text-2xl">
                shunkakinoki
              </span>
            </a>
          </Link>
        </div>
        <div className="-my-2 -mr-2 md:hidden">
          <MenuButton />
        </div>
        <MobileMenu />
        <nav className="hidden grow shrink-0 align-baseline md:block">
          <ul className="flex justify-end items-center leading-5">
            <HeaderLink href="/about">{t("common:header.about")}</HeaderLink>
            <HeaderLink href="/blog">{t("common:header.blog")}</HeaderLink>
            <HeaderLink href="/dashboard">
              {t("common:header.dashboard")}
            </HeaderLink>
          </ul>
        </nav>
        <span className="pl-3">
          <DarkModeButton />
        </span>
      </header>
    </nav>
  );
};
