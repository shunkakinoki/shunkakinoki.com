import HistoryStep from "@/components/History/HistoryStep";
import clsx from "clsx";
import { SectionText } from "@/common/Text";
import { SwitchButton } from "@/common/Button";

interface Props {
  isPartial?: boolean;
}

interface HistoryYearProps {
  children: string;
}

function HistoryYear({ children }: HistoryYearProps): JSX.Element {
  return (
    <h3 className="mt-2 mb-4 font-light tracking-tight text-gray-400 md:text-base dark:text-gray-300">
      {children}
    </h3>
  );
}

export default function History({ isPartial = false }: Props): JSX.Element {
  return (
    <section className={clsx("w-full mb-2", isPartial && "mt-6")} id="#history">
      <div className="px-3 md:px-0">
        <SectionText isPartial={isPartial}>History</SectionText>
      </div>
      <div className="flex-col items-center w-full">
        <HistoryYear>Present</HistoryYear>
        <ul className="my-3">
          <HistoryStep time="March 2020 ~ Present" type="work">
            Founder, Sentrei, Inc.
          </HistoryStep>
          <HistoryStep time="January 2020 ~ Present" type="globe">
            Living in Tokyo, Japan.
          </HistoryStep>
          <HistoryStep time="April 2017 ~ Present" type="school" isBottom>
            Keio University
          </HistoryStep>
        </ul>
        {!isPartial && (
          <>
            <HistoryYear>2020</HistoryYear>
            <ul className="my-3">
              <HistoryStep time="August 2020" type="work" isBottom>
                Selected as a Pioneer
              </HistoryStep>
            </ul>
            <HistoryYear>1998</HistoryYear>
            <ul className="my-3">
              <HistoryStep time="October 2nd, 1998" type="cake" isBottom>
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
