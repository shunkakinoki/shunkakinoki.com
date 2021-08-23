import clsx from "clsx";

import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { MDXRemote } from "next-mdx-remote";
import type { FC } from "react";

import { SwitchButton } from "@/common/Button";
import { SectionText } from "@/common/Text";

export interface Props {
  isPartial?: boolean;
  source: MDXRemoteSerializeResult;
}

interface AboutLinkProps {
  children: string;
  href: string;
}

export const AboutLink: FC<AboutLinkProps> = ({ children, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-gray-400 underline"
    >
      {children}
    </a>
  );
};

const components = {
  a: AboutLink,
};

export const About: FC<Props> = ({ isPartial, source }) => {
  return (
    <section className={clsx("mb-6 w-full", isPartial && "mt-6")}>
      <div className="px-3 md:px-0">
        {isPartial && (
          <h1 className="mb-4 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black dark:text-white">
            Hi, I’m Shun Kakinoki.
          </h1>
        )}
        {!isPartial && (
          <SectionText isPartial={isPartial}>About me</SectionText>
        )}
      </div>
      <div className="px-4 sm:px-3 md:px-0">
        <h3 className="text-lg md:text-xl leading-loose text-warmGray-800 dark:text-coolGray-200">
          <MDXRemote {...source} components={components} />
        </h3>
      </div>
      <div className="pt-3 my-3 w-full leading-5 text-center">
        <div className="flex justify-center w-full">
          <SwitchButton
            href={isPartial ? "/about" : "/#about"}
            type={isPartial ? "right" : "left"}
          />
        </div>
      </div>
    </section>
  );
};
