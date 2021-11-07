import type { LinkProps } from "next/link";
import Link from "next/link";

import type { ReactNode, FC } from "react";

import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

import { CreditsButton } from "@/components/Footer/CreditsButton";
import { LocaleSelect } from "@/components/Footer/LocaleSelect";

import { SocialLinks } from "@/const";
import packageJson from "@/packageJson";

interface FooterLinkProps extends LinkProps {
  children: string;
}

interface FooterIconLinkProps {
  children: ReactNode;
  href: string;
}

interface FooterTokenLinkProps {
  children: ReactNode;
  href: string;
}

export const FooterLink: FC<FooterLinkProps> = ({ children, href }) => {
  return (
    <div className="py-2 px-5">
      <Link href={href}>
        <a className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
          {children}
        </a>
      </Link>
    </div>
  );
};

export const FooterIconLink: FC<FooterIconLinkProps> = ({ children, href }) => {
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
};

export const FooterTokenLink: FC<FooterTokenLinkProps> = ({
  children,
  href,
}) => {
  return (
    <span className="group">
      <a
        className="group-hover:underline group-hover:uppercase"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="hidden group-hover:inline">$</span>
        {children}
      </a>
    </span>
  );
};

export const Footer: FC = () => {
  return (
    <footer className="overflow-hidden py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <nav
        className="flex flex-wrap justify-center -my-2 -mx-5"
        aria-label="Footer"
      >
        <FooterLink href="/about">About</FooterLink>
        <FooterLink href="/blog">Blog</FooterLink>
        <FooterLink href="/cal">Cal</FooterLink>
        <FooterLink href="/clock">Clock</FooterLink>
        <FooterLink href="/checklist">Checklist</FooterLink>
        <FooterLink href="/dashboard">Dashboard</FooterLink>
        <FooterLink href="/og">OG</FooterLink>
        <FooterLink href="/history">History</FooterLink>
        <FooterLink href="/products">Products</FooterLink>
        <FooterLink href="/social">Social</FooterLink>
      </nav>
      <div className="flex justify-center mt-8 space-x-6">
        <FooterIconLink href={SocialLinks.facebook}>
          <span className="sr-only">Facebook</span>
          <FaFacebook className="w-6 h-6" />
        </FooterIconLink>
        <FooterIconLink href={SocialLinks.instagram}>
          <span className="sr-only">Instagram</span>
          <FaInstagram className="w-6 h-6" />
        </FooterIconLink>
        <FooterIconLink href={SocialLinks.linkedin}>
          <span className="sr-only">Linkedin</span>
          <FaLinkedin className="w-6 h-6" />
        </FooterIconLink>
        <FooterIconLink href={SocialLinks.github}>
          <span className="sr-only">GitHub</span>
          <FaGithub className="w-6 h-6" />
        </FooterIconLink>
        <FooterIconLink href={SocialLinks.twitter}>
          <span className="sr-only">Twitter</span>
          <FaTwitter className="w-6 h-6" />
        </FooterIconLink>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center pt-8 mx-auto space-y-6 sm:space-y-0 space-x-6 max-w-3xl">
        <p className="flex-shrink-0 text-base text-center text-gray-400">
          <a
            className="hover:text-warmGray-600 dark:hover:text-warmGray-300 hover:underline"
            href={`${SocialLinks.github}/shunkakinoki.com/tree/v${packageJson.version}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            v{packageJson.version}.
          </a>{" "}
          &copy; <FooterTokenLink href={SocialLinks.shun}>Shun</FooterTokenLink>{" "}
          <FooterTokenLink href={SocialLinks.kaki}>Kaki</FooterTokenLink>
          noki. All rights reserved.
        </p>
        <CreditsButton />
        <div className="sm:flex-grow-0">
          <LocaleSelect />
        </div>
      </div>
    </footer>
  );
};
