import clsx from "clsx";

import { SwitchButton } from "@/common/Button";
import { SectionText } from "@/common/Text";
import LifeCard from "@/components/Life/LifeCard";
import {
  Action,
  Bible,
  Diary,
  Excerpt,
  Habit,
  Insight,
  Perseverance,
  Resource,
  Notebook,
} from "@/icons";

interface Props {
  isPartial?: boolean;
}

export default function Life({ isPartial = false }: Props): JSX.Element {
  return (
    <section key="Life" className={clsx("w-full mb-2", isPartial && "mt-6")}>
      <div className="px-3 md:px-0">
        <SectionText isPartial={isPartial}>Life</SectionText>
      </div>
      <div className="overflow-hidden bg-gray-200 shadow-lg divide-y divide-gray-200 dark:bg-gray-600 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-0.5 md:grid-cols-3">
        {!isPartial && (
          <LifeCard color="pink" name="Action" href="/action">
            <Action />
          </LifeCard>
        )}
        {!isPartial && (
          <LifeCard color="indigo" name="Bible" href="/bible">
            <Bible />
          </LifeCard>
        )}
        <LifeCard color="red" name="Diary" href="/diary">
          <Diary />
        </LifeCard>
        {!isPartial && (
          <LifeCard color="purple" name="Excerpt" href="/excerpt">
            <Excerpt />
          </LifeCard>
        )}
        <LifeCard color="blue" name="Habit" href="/habit">
          <Habit />
        </LifeCard>
        {!isPartial && (
          <LifeCard color="gray" name="Insight" href="/insight">
            <Insight />
          </LifeCard>
        )}
        <LifeCard color="green" name="Notebook" href="/notebook">
          <Notebook />
        </LifeCard>
        {!isPartial && (
          <LifeCard color="yellow" name="Perseverance" href="/perseverance">
            <Perseverance />
          </LifeCard>
        )}
        {!isPartial && (
          <LifeCard hidden color="purple" name="Resource" href="/resource">
            <Resource />
          </LifeCard>
        )}
      </div>
      <div className="w-full pt-3 my-3 leading-5 text-center">
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
