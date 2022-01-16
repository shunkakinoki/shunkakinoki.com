import {
  PaperAirplaneIcon,
  ScaleIcon,
  VariableIcon,
} from "@heroicons/react/outline";
import clsx from "clsx";
import type { FC } from "react";

import { SwitchButton } from "@/common/Button";
import { SectionText } from "@/common/Text";
import { LifeCard } from "@/components/Life/LifeCard";

export interface Props {
  isPartial?: boolean;
}

export const Life: FC<Props> = ({ isPartial = false }) => {
  return (
    <section key="Life" className={clsx("mb-2 w-full", isPartial && "mt-6")}>
      <div className="px-3 md:px-0">
        <SectionText isPartial={isPartial}>Life</SectionText>
      </div>
      <div className="overflow-hidden bg-gray-200 dark:bg-gray-600 divide-y divide-gray-200 sm:grid sm:grid-cols-2 sm:gap-0.5 sm:divide-y-0 md:grid-cols-3">
        <LifeCard color="pink" name="Cause" href="/cause">
          <VariableIcon className="w-6 h-6" />
        </LifeCard>
        <LifeCard color="indigo" name="Mission" href="/mission">
          <PaperAirplaneIcon className="w-6 h-6" />
        </LifeCard>
        <LifeCard color="red" name="Values" href="/values">
          <ScaleIcon className="w-6 h-6" />
        </LifeCard>
      </div>
      <div className="pt-3 my-3 w-full leading-5 text-center">
        <div className="flex justify-center w-full">
          <SwitchButton
            href={isPartial ? "/about" : "/#life"}
            type={isPartial ? "right" : "left"}
          />
        </div>
      </div>
    </section>
  );
};
