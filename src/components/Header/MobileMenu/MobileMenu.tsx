import { Transition } from "@headlessui/react";
import useTranslation from "next-translate/useTranslation";
import type { LinkProps } from "next/link";
import Link from "next/link";

import type { FC } from "react";

import { useMobileMenu } from "@/hooks/useMobileMenu";

interface MobileMenuLinkProps extends LinkProps {
  children: string;
}

export const MobileMenuLink: FC<MobileMenuLinkProps> = ({ children, href }) => {
  return (
    <div className="group py-1 px-5">
      <Link href={href}>
        <a className="flex items-center p-3 -m-3 group-hover:bg-warmGray-200 dark:group-hover:bg-gray-800 rounded-md">
          <span className="ml-3 text-base font-medium text-gray-900 group-hover:text-warmGray-800 dark:text-coolGray-300 dark:group-hover:text-coolGray-100">
            {children}
          </span>
        </a>
      </Link>
    </div>
  );
};

export const MobileMenu: FC = () => {
  const [isMenuOpen, setMenuOpen] = useMobileMenu();
  const { t } = useTranslation();

  return (
    <Transition
      show={isMenuOpen}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="absolute inset-x-0 top-0 p-2 transition origin-top-right md:hidden">
        <div className="bg-white dark:bg-black rounded-lg divide-y-2 divide-gray-50 ring-1 ring-black shadow-lg">
          <div className="px-5 pt-5 pb-6">
            <div className="flex justify-between items-center">
              <div />
              <div className="-mr-2">
                <button
                  type="button"
                  className="inline-flex justify-center items-center p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-200 bg-white hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  onClick={() => {
                    return setMenuOpen(isMenuOpen => {
                      return !isMenuOpen;
                    });
                  }}
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="pb-3 mt-6">
              <nav className="grid gap-y-8">
                <MobileMenuLink href="/about">
                  {t("common:header.about")}
                </MobileMenuLink>
                <MobileMenuLink href="/blog">
                  {t("common:header.blog")}
                </MobileMenuLink>
                <MobileMenuLink href="/dashboard">
                  {t("common:header.dashboard")}
                </MobileMenuLink>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};
