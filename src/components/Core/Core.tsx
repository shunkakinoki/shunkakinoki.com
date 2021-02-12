import clsx from "clsx";

import { SwitchButton } from "@/common/Button";
import { SectionText } from "@/common/Text";
import CoreCard from "@/components/Core/CoreCard";
import { Airplane, Scale, Variable } from "@/icons";

interface Props {
  isPartial?: boolean;
}

export default function Core({ isPartial = false }: Props): JSX.Element {
  return (
    <section key="Core" className={clsx("w-full mb-2", isPartial && "mt-6")}>
      <div className="px-3 md:px-0">
        <SectionText isPartial={isPartial}>Core</SectionText>
      </div>
      <dl className="overflow-hidden bg-gray-200 lg:grid sm:gap-0.5 lg:grid-cols-3">
        <CoreCard color="blue" name="Cause" href="/cause">
          <Variable />
        </CoreCard>
        <CoreCard color="indigo" name="Mission" href="/mission">
          <Airplane />
        </CoreCard>
        <CoreCard color="purple" name="Values" href="/values">
          <Scale />
        </CoreCard>
      </dl>
      <div className="w-full pt-3 my-3 text-center leading-5">
        <div className="flex justify-center w-full">
          <SwitchButton
            href={isPartial ? "/about" : "/#core"}
            type={isPartial ? "right" : "left"}
          />
        </div>
      </div>
    </section>
  );
}
