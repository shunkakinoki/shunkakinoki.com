import Link, { LinkProps } from "next/link";
import { Facebook, Github, Instagram, Twitter } from "@/icons";
import { ReactNode } from "react";
import { Social } from "@/const";

interface FooterLinkProps extends LinkProps {
  children: string;
}

interface FooterIconLinkProps {
  children: ReactNode;
  href: string;
}

function FooterLink({ children, href }: FooterLinkProps): JSX.Element {
  return (
    <div className="px-5 py-2">
      <Link href={href}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-200">
          {children}
        </a>
      </Link>
    </div>
  );
}

function FooterIconLink({ children, href }: FooterIconLinkProps): JSX.Element {
  return (
    <a
      href={href}
      className="text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-200"
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
        <FooterLink href="/social">Social</FooterLink>
      </nav>
      <div className="flex justify-center mt-8 space-x-6">
        <FooterIconLink href={Social.facebook}>
          <span className="sr-only">Facebook</span>
          <Facebook></Facebook>
        </FooterIconLink>
        <FooterIconLink href={Social.instagram}>
          <span className="sr-only">Instagram</span>
          <Instagram></Instagram>
        </FooterIconLink>
        <FooterIconLink href={Social.github}>
          <span className="sr-only">GitHub</span>
          <Github></Github>
        </FooterIconLink>
        <FooterIconLink href={Social.twitter}>
          <span className="sr-only">Twitter</span>
          <Twitter></Twitter>
        </FooterIconLink>
      </div>
      <p className="mt-8 text-base text-center text-gray-400">
        &copy; 2021 Shun Kakinoki. All rights reserved.
      </p>
    </footer>
  );
}
