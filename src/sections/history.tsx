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
import { PageHeader, PageHeaderHeading } from "../components/page-header.ts";

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
    <section key="history" class="mb-2 w-full">
      <PageHeader>
        <PageHeaderHeading>{t("history.title")}</PageHeaderHeading>
      </PageHeader>
      <div class="mt-3 w-full flex-col items-center">
        <HistoryYear>Present</HistoryYear>
        <ul class="my-3">
          <HistoryStep time="January 2020 ~ Present" type="globe">
            Living in Tokyo, Japan.
          </HistoryStep>
          <HistoryStep isBottom time="April 2017 ~ Present" type="school">
            Keio University, Department of Law
          </HistoryStep>
        </ul>
        <>
          <HistoryYear>2020</HistoryYear>
          <ul class="my-3">
            <HistoryStep isBottom time="August 2020" type="tag">
              Selected as a Pioneer at pioneer.app
            </HistoryStep>
          </ul>
          <HistoryYear>2018</HistoryYear>
          <ul class="my-3">
            <HistoryStep time="June 2018" type="fire">
              Started hacking through fast.ai
            </HistoryStep>
            <HistoryStep isBottom time="May 2018" type="chip">
              Quit football team
            </HistoryStep>
          </ul>
          <HistoryYear>2017</HistoryYear>
          <ul class="my-3">
            <HistoryStep isBottom time="April 2017" type="school">
              Entered Keio University
            </HistoryStep>
          </ul>
          <HistoryYear>2010</HistoryYear>
          <ul class="my-3">
            <HistoryStep isBottom time="January 2010" type="globe">
              Moved back to Japan
            </HistoryStep>
          </ul>
          <HistoryYear>2004</HistoryYear>
          <ul class="my-3">
            <HistoryStep isBottom time="August 2004" type="globe">
              Moved to Silicon Valley
            </HistoryStep>
          </ul>
          <HistoryYear>1998</HistoryYear>
          <ul class="my-3">
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
      class="-ml-px absolute top-4 left-4 h-full w-0.5 bg-border"
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
      <div class={clsx("relative", isBottom && "pb-2", !isBottom && "pb-8")}>
        {!isBottom && <HistoryConnector />}
        <div class="relative flex space-x-3">
          <div>
            <span
              class={clsx(
                "flex h-8 w-8 items-center justify-center rounded-full text-white",
                type === "cake" && "bg-pink-500",
                type === "chip" && "bg-gray-500",
                type === "fire" && "bg-red-500",
                type === "globe" && "bg-green-500",
                type === "school" && "bg-yellow-500",
                type === "tag" && "bg-blue-500",
                type === "work" && "bg-indigo-500",
              )}
            >
              {type === "cake" && <CakeIcon class="h-5 w-5" />}
              {type === "chip" && <PaperClipIcon class="h-5 w-5" />}
              {type === "fire" && <FireIcon class="h-5 w-5" />}
              {type === "globe" && <GlobeAltIcon class="h-5 w-5" />}
              {type === "school" && <AcademicCapIcon class="h-5 w-5" />}
              {type === "tag" && <TagIcon class="h-5 w-5" />}
              {type === "work" && <BriefcaseIcon class="h-5 w-5" />}
            </span>
          </div>
          <div class="flex min-w-0 flex-1 items-center justify-between space-x-4">
            <div>
              <p class="line-clamp-3 text-sm text-text">{children}</p>
            </div>
            <div class="whitespace-nowrap text-right text-sm text-text-weak">
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
    <h3 class="mt-2 mb-4 font-light text-text-weak tracking-tight md:text-base">
      {children}
    </h3>
  );
};
