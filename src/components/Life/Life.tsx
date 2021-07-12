import clsx from "clsx";

import { SwitchButton } from "@/common/Button";
import { SectionText } from "@/common/Text";
import LifeCard from "@/components/Life/LifeCard";
import {
  Diary,
  Excerpt,
  Habit,
  Insight,
  Resource,
  Notebook,
  Airplane,
  Scale,
  Variable,
} from "@/icons";

interface Props {
  isPartial?: boolean;
}

export default function Life({ isPartial = false }: Props): JSX.Element {
  return (
    <section key="Life" className={clsx("mb-2 w-full", isPartial && "mt-6")}>
      <div className="px-3 md:px-0">
        <SectionText isPartial={isPartial}>Life</SectionText>
      </div>
      <div className="sm:grid overflow-hidden sm:grid-cols-2 md:grid-cols-3 sm:gap-0.5 bg-gray-200 dark:bg-gray-600 divide-y sm:divide-y-0 divide-gray-200">
        <LifeCard color="pink" name="Cause" href="/cause">
          <Variable />
        </LifeCard>
        <LifeCard color="indigo" name="Mission" href="/mission">
          <Airplane />
        </LifeCard>
        <LifeCard color="red" name="Values" href="/values">
          <Scale />
        </LifeCard>
        {!isPartial && (
          <LifeCard color="purple" name="Diary" href="/diary">
            <Diary />
          </LifeCard>
        )}
        {!isPartial && (
          <LifeCard color="blue" name="Excerpt" href="/excerpt">
            <Excerpt />
          </LifeCard>
        )}
        {!isPartial && (
          <LifeCard color="gray" name="Routine" href="/routine">
            <Habit />
          </LifeCard>
        )}
        {!isPartial && (
          <LifeCard color="green" name="Ideas" href="/ideas">
            <Insight />
          </LifeCard>
        )}
        {!isPartial && (
          <LifeCard color="yellow" name="Notebook" href="/notebook">
            <Notebook />
          </LifeCard>
        )}
        {!isPartial && (
          <LifeCard hidden color="purple" name="Resource" href="/resource">
            <Resource />
          </LifeCard>
        )}
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
}
