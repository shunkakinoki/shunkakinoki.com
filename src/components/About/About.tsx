import clsx from "clsx";

import Link from "next/link";

import { SectionText } from "@/common/Text";
import { ProductLinks, SocialLinks } from "@/const";
import { Chevron } from "@/icons";

interface Props {
  isPartial?: boolean;
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

export default function About({ isPartial }: Props): JSX.Element {
  return (
    <section className={clsx("w-full mb-6", isPartial && "mt-6")}>
      <div className="px-3 md:px-0">
        {isPartial && (
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl lg:text-6xl dark:text-white">
            Hi, I’m Shun Kakinoki.
          </h1>
        )}
        {!isPartial && (
          <div className="px-3 md:px-0">
            <SectionText isPartial={isPartial}>About me</SectionText>
          </div>
        )}
        <h2 className="text-base text-gray-600 md:text-lg dark:text-gray-300">
          I am an{" "}
          <AboutLink href={ProductLinks.sentrei}>entrepreneur</AboutLink>,{" "}
          <AboutLink href={SocialLinks.github}>hacker</AboutLink>, &amp;{" "}
          <AboutLink href={SocialLinks.pioneer}>pioneer</AboutLink> striving to
          obliterate the galaxy.{" "}
          {isPartial && (
            <Link href="/about">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                className="inline-block font-medium text-indigo-600 align-bottom animate-pulse dark:text-indigo-400"
                aria-label="about"
              >
                <Chevron />
              </a>
            </Link>
          )}
          <br />
          {!isPartial && (
            <span>
              I have spent my childhood years in Silicon Valley (Cupertino City)
              from 4 to 10 years old and have 3+ years of experience in
              AI/CV/DL, Fullstack Web Development &amp; and Cloud (especially
              DevOps). <br />
              Love open source and extremely passionate about the potential of
              startups towards the future of the world.
            </span>
          )}
        </h2>
      </div>
    </section>
  );
}
