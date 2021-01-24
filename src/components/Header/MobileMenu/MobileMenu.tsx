import { Transition } from "@headlessui/react";
import useTranslation from "next-translate/useTranslation";
import Link, { LinkProps } from "next/link";

import useMobileMenu from "@/hooks/useMobileMenu";
interface MobileMenuLinkProps extends LinkProps {
  children: string;
}

function MobileMenuLink({ children, href }: MobileMenuLinkProps): JSX.Element {
  return (
    <div className="px-5 py-1">
      <Link href={href}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className="flex items-center p-3 -m-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">
          <span className="ml-3 text-base font-medium text-gray-900 dark:text-gray-300">
            {children}
          </span>
        </a>
      </Link>
    </div>
  );
}

export default function MobileMenu(): JSX.Element {
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
      <div className="absolute inset-x-0 top-0 p-2 transition origin-top-right transform md:hidden">
        <div className="bg-white rounded-lg shadow-lg divide-y-2 dark:bg-black ring-1 ring-black ring-opacity-5 divide-gray-50">
          <div className="px-5 pt-5 pb-6">
            <div className="flex items-center justify-between">
              <div />
              <div className="-mr-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md dark:bg-black hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  onClick={() => setMenuOpen((isMenuOpen) => !isMenuOpen)}
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
            <div className="mt-6">
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
}
