import Link, {LinkProps} from "next/link";

import {ReactNode} from "react";

import CreditsButton from "@/components/Footer/CreditsButton";
import LocaleSelect from "@/components/Footer/LocaleSelect";

import {SocialLinks} from "@/const";
import {Facebook, Github, Instagram, Linkedin, Twitter} from "@/icons";
interface FooterLinkProps extends LinkProps {
  children: string;
}

interface FooterIconLinkProps {
  children: ReactNode;
  href: string;
}

function FooterLink({children, href}: FooterLinkProps): JSX.Element {
  return (
    <div className="px-5 py-2">
      <Link href={href}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
          {children}
        </a>
      </Link>
    </div>
  );
}

function FooterIconLink({children, href}: FooterIconLinkProps): JSX.Element {
  return (
    <a
      href={href}
      className="text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

export default function Footer(): JSX.Element {
  return (
    <footer className="px-4 py-12 mx-auto overflow-hidden max-w-7xl sm:px-6 lg:px-8">
      <nav
        className="flex flex-wrap justify-center -mx-5 -my-2"
        aria-label="Footer"
      >
        <FooterLink href="/about">About</FooterLink>
        <FooterLink href="/blog">Blog</FooterLink>
        <FooterLink href="/dashboard">Dashboard</FooterLink>
        <FooterLink href="/history">History</FooterLink>
        <FooterLink href="/products">Products</FooterLink>
        <FooterLink href="/social">Social</FooterLink>
      </nav>
      <div className="flex justify-center mt-8 space-x-6">
        <FooterIconLink href={SocialLinks.facebook}>
          <span className="sr-only">Facebook</span>
          <Facebook />
        </FooterIconLink>
        <FooterIconLink href={SocialLinks.instagram}>
          <span className="sr-only">Instagram</span>
          <Instagram />
        </FooterIconLink>
        <FooterIconLink href={SocialLinks.linkedin}>
          <span className="sr-only">Linkedin</span>
          <Linkedin />
        </FooterIconLink>
        <FooterIconLink href={SocialLinks.github}>
          <span className="sr-only">GitHub</span>
          <Github />
        </FooterIconLink>
        <FooterIconLink href={SocialLinks.twitter}>
          <span className="sr-only">Twitter</span>
          <Twitter />
        </FooterIconLink>
      </div>
      <div className="flex flex-col items-center justify-center max-w-3xl pt-8 mx-auto space-x-6 space-y-6 sm:flex-row sm:space-y-0">
        <p className="flex-shrink-0 text-base text-center text-gray-400">
          &copy; Shun Kakinoki. All rights reserved.
        </p>
        <CreditsButton />
        <div className="sm:flex-grow-0">
          <LocaleSelect />
        </div>
      </div>
    </footer>
  );
}
