import clsx from "clsx";

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
    <section key="Life" className={clsx("w-full mb-6", isPartial && "mt-6")}>
      <div className="px-3 md:px-0">
        <SectionText isPartial={isPartial}>Life</SectionText>
      </div>
      <div className="overflow-hidden bg-gray-200 shadow divide-y divide-gray-200 dark:bg-gray-400 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-0.5 md:grid-cols-3">
        {!isPartial && (
          <LifeCard color="red" name="Action" href="/action">
            <Action />
          </LifeCard>
        )}
        {!isPartial && (
          <LifeCard color="indigo" name="Bible" href="/bible">
            <Bible />
          </LifeCard>
        )}
        <LifeCard color="blue" name="Diary" href="/diary">
          <Diary />
        </LifeCard>
        {!isPartial && (
          <LifeCard color="purple" name="Excerpt" href="/excerpt">
            <Excerpt />
          </LifeCard>
        )}
        <LifeCard color="pink" name="Habit" href="/habit">
          <Habit />
        </LifeCard>
        {!isPartial && (
          <LifeCard color="green" name="Insight" href="/insight">
            <Insight />
          </LifeCard>
        )}
        {!isPartial && (
          <LifeCard color="gray" name="Notebook" href="/notebook">
            <Notebook />
          </LifeCard>
        )}
        {!isPartial && (
          <LifeCard color="blue" name="Perseverance" href="/perseverance">
            <Perseverance />
          </LifeCard>
        )}
        {!isPartial && (
          <LifeCard color="yellow" name="Resource" href="/resource">
            <Resource />
          </LifeCard>
        )}
      </div>
    </section>
  );
}
