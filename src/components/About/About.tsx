import clsx from "clsx";

import hydrate from "next-mdx-remote/hydrate";
import type { MdxRemote } from "next-mdx-remote/types";

import { SwitchButton } from "@/common/Button";
import { SectionText } from "@/common/Text";

export interface Props {
  isPartial?: boolean;
  source: MdxRemote.Source;
}

interface AboutLinkProps {
  children: string;
  href: string;
}

function AboutLink({ children, href }: AboutLinkProps) {
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
}

const components = {
  a: AboutLink,
};

export default function About({ isPartial, source }: Props): JSX.Element {
  const content = hydrate(source, { components });

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
        <h3 className="text-lg md:text-xl leading-loose text-gray-600 dark:text-gray-300">
          {content}
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
}
