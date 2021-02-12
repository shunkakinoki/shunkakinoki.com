import clsx from "clsx";

import hydrate from "next-mdx-remote/hydrate";
import { MdxRemote } from "next-mdx-remote/types";

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
      className="underline hover:text-gray-400"
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
    <section className={clsx("w-full mb-6", isPartial && "mt-6")}>
      <div className="px-3 md:px-0">
        {isPartial && (
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl lg:text-6xl dark:text-white">
            Hi, I’m Shun Kakinoki.
          </h1>
        )}
        {!isPartial && (
          <SectionText isPartial={isPartial}>About me</SectionText>
        )}
      </div>
      <div className="px-4 sm:px-3 md:px-0">
        <h2 className="text-lg leading-loose text-gray-600 md:text-xl dark:text-gray-300">
          {content}
        </h2>
      </div>
      <div className="w-full pt-3 my-3 text-center leading-5">
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
