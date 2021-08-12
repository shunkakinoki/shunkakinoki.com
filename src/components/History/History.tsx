import clsx from "clsx";

import type { FC } from "react";

import { SwitchButton } from "@/common/Button";
import { SectionText } from "@/common/Text";
import { HistoryStep } from "@/components/History/HistoryStep";

export interface Props {
  isPartial?: boolean;
}

interface HistoryYearProps {
  children: string;
}

export const HistoryYear: FC<HistoryYearProps> = ({ children }) => {
  return (
    <h3 className="mt-2 mb-4 md:text-base font-light tracking-tight text-gray-500 dark:text-gray-100">
      {children}
    </h3>
  );
};

export const History: FC<Props> = ({ isPartial = false }) => {
  return (
    <section key="history" className={clsx("mb-2 w-full", isPartial && "mt-6")}>
      <div className="px-3 md:px-0">
        <SectionText isPartial={isPartial}>History</SectionText>
      </div>
      <div className="flex-col items-center px-6 sm:px-4 md:px-0 mt-3 w-full">
        <HistoryYear>Present</HistoryYear>
        <ul className="my-3">
          <HistoryStep time="January 2020 ~ Present" type="globe">
            Living in Tokyo, Japan.
          </HistoryStep>
          <HistoryStep isBottom time="April 2017 ~ Present" type="school">
            Keio University, Department of Law
          </HistoryStep>
        </ul>
        {!isPartial && (
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
        )}
      </div>
      <div className="flex justify-center w-full">
        <SwitchButton
          href={isPartial ? "/history" : "/#history"}
          type={isPartial ? "right" : "left"}
        />
      </div>
    </section>
  );
};
