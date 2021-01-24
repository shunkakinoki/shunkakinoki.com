import clsx from "clsx";

import { SwitchButton } from "@/common/Button";
import { SectionText } from "@/common/Text";
import HistoryStep from "@/components/History/HistoryStep";

interface Props {
  isPartial?: boolean;
}

interface HistoryYearProps {
  children: string;
}

function HistoryYear({ children }: HistoryYearProps): JSX.Element {
  return (
    <h3 className="mt-2 mb-4 font-light tracking-tight text-gray-500 md:text-base dark:text-gray-100">
      {children}
    </h3>
  );
}

export default function History({ isPartial = false }: Props): JSX.Element {
  return (
    <section key="history" className={clsx("w-full mb-2", isPartial && "mt-6")}>
      <div className="px-3 md:px-0">
        <SectionText isPartial={isPartial}>History</SectionText>
      </div>
      <div className="flex-col items-center w-full px-6 mt-3 sm:px-4 md:px-0">
        <HistoryYear>Present</HistoryYear>
        <ul className="my-3">
          <HistoryStep time="March 2020 ~ Present" type="work">
            Founder, Sentrei, Inc.
          </HistoryStep>
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
              <HistoryStep time="August 2020" type="tag">
                Selected as a Pioneer at pioneer.app
              </HistoryStep>
              <HistoryStep isBottom time="March 2020" type="work">
                Founded Sentrei, Inc.
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
          href={isPartial ? "/history" : "/"}
          type={isPartial ? "right" : "left"}
        />
      </div>
    </section>
  );
}
