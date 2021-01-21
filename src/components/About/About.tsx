import clsx from "clsx";
import { SectionText } from "@/common/Text";

interface Props {
  isPartial?: boolean;
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
          I am an entrepreneur striving to obliterate the galaxy.
          {!isPartial && (
            <span>
              I have spent my childhood years in Silicon Valley (Cupertino City)
              from 4 to 10 years old and have 3+ years of experience in
              AI/CV/DL, Fullstack Web Development &amp; and Cloud (especially
              DevOps). Love open source and extremely passionate about the
              potential of startups towards the future of the world.
            </span>
          )}
        </h2>
      </div>
    </section>
  );
}
