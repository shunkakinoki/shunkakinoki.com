import {
  AcademicCapIcon,
  BriefcaseIcon,
  CakeIcon,
  FireIcon,
  GlobeAltIcon,
  PaperClipIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import type { FC } from "react";
import { PageHeader, PageHeaderHeading } from "./page-header";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const History: FC = () => {
  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------

  const t = useTranslations();

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <section key="history" className="mb-2 w-full">
      <PageHeader>
        <PageHeaderHeading>{t("history.title")}</PageHeaderHeading>
      </PageHeader>
      <div className="mt-3 w-full flex-col items-center px-6 sm:px-4 md:px-0">
        <HistoryYear>Present</HistoryYear>
        <ul className="my-3">
          <HistoryStep time="January 2020 ~ Present" type="globe">
            Living in Tokyo, Japan.
          </HistoryStep>
          <HistoryStep isBottom time="April 2017 ~ Present" type="school">
            Keio University, Department of Law
          </HistoryStep>
        </ul>
        <>
          <HistoryYear>2020</HistoryYear>
          <ul className="my-3">
            <HistoryStep isBottom time="August 2020" type="tag">
              Selected as a Pioneer at pioneer.app
            </HistoryStep>
          </ul>
          <HistoryYear>2018</HistoryYear>
          <ul className="my-3">
            <HistoryStep time="June 2018" type="fire">
              Started hacking through fast.ai
            </HistoryStep>
            <HistoryStep isBottom time="May 2018" type="chip">
              Quit football team
            </HistoryStep>
          </ul>
          <HistoryYear>2017</HistoryYear>
          <ul className="my-3">
            <HistoryStep isBottom time="April 2017" type="school">
              Entered Keio University
            </HistoryStep>
          </ul>
          <HistoryYear>2010</HistoryYear>
          <ul className="my-3">
            <HistoryStep isBottom time="January 2010" type="globe">
              Moved back to Japan
            </HistoryStep>
          </ul>
          <HistoryYear>2004</HistoryYear>
          <ul className="my-3">
            <HistoryStep isBottom time="August 2004" type="globe">
              Moved to Silicon Valley
            </HistoryStep>
          </ul>
          <HistoryYear>1998</HistoryYear>
          <ul className="my-3">
            <HistoryStep isBottom time="October 2nd, 1998" type="cake">
              Born at Nara City in Japan
            </HistoryStep>
          </ul>
        </>
      </div>
    </section>
  );
};

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

export interface HistoryStepProps {
  isBottom?: boolean;
  children: string;
  time: string;
  type: "cake" | "chip" | "fire" | "globe" | "school" | "tag" | "work";
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const HistoryConnector: FC = () => {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <span
      className="-ml-px absolute top-4 left-4 h-full w-0.5 bg-gray-200 dark:bg-gray-500"
      aria-hidden="true"
    />
  );
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const HistoryStep: FC<HistoryStepProps> = ({
  isBottom = false,
  children,
  time,
  type,
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
}) => {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <li>
      <div
        className={clsx("relative", isBottom && "pb-2", !isBottom && "pb-8")}
      >
        {!isBottom && <HistoryConnector />}
        <div className="relative flex space-x-3">
          <div>
            <span
              className={clsx(
                "flex h-8 w-8 items-center justify-center rounded-full text-gray-100 ring-8 ring-white dark:ring-black",
                type === "cake" && "bg-pink-500",
                type === "chip" && "bg-gray-500",
                type === "fire" && "bg-red-500",
                type === "globe" && "bg-green-500",
                type === "school" && "bg-yellow-500",
                type === "tag" && "bg-blue-500",
                type === "work" && "bg-indigo-500",
              )}
            >
              {type === "cake" && <CakeIcon className="h-5 w-5" />}
              {type === "chip" && <PaperClipIcon className="h-5 w-5" />}
              {type === "fire" && <FireIcon className="h-5 w-5" />}
              {type === "globe" && <GlobeAltIcon className="h-5 w-5" />}
              {type === "school" && <AcademicCapIcon className="h-5 w-5" />}
              {type === "tag" && <TagIcon className="h-5 w-5" />}
              {type === "work" && <BriefcaseIcon className="h-5 w-5" />}
            </span>
          </div>
          <div className="flex min-w-0 flex-1 items-center justify-between space-x-4">
            <div>
              <p className="line-clamp-3 text-gray-500 text-sm dark:text-gray-300">
                {children}
              </p>
            </div>
            <div className="whitespace-nowrap text-right text-gray-500 text-sm dark:text-gray-400">
              <time>{time}</time>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface HistoryYearProps {
  children: string;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const HistoryYear: FC<HistoryYearProps> = ({ children }) => {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <h3 className="mt-2 mb-4 font-light text-gray-500 tracking-tight md:text-base dark:text-gray-100">
      {children}
    </h3>
  );
};
