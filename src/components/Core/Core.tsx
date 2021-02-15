import clsx from "clsx";
import useTranslation from "next-translate/useTranslation";

import { SwitchButton } from "@/common/Button";
import { SectionText } from "@/common/Text";
import CoreCard from "@/components/Core/CoreCard";
import { Airplane, Scale, Variable } from "@/icons";

interface Props {
  isPartial?: boolean;
}

export default function Core({ isPartial = false }: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <section key="Core" className={clsx("w-full mb-2", isPartial && "mt-6")}>
      <div className="px-3 md:px-0">
        <SectionText isPartial={isPartial}>Core</SectionText>
      </div>
      <dl className="overflow-hidden bg-gray-200 grid gap-0.5 grid-cols-1 sm:grid-cols-3">
        <CoreCard color="blue" name={t("about:core.cause")} href="/cause">
          <Variable />
        </CoreCard>
        <CoreCard color="indigo" name={t("about:core.mission")} href="/mission">
          <Airplane />
        </CoreCard>
        <CoreCard color="purple" name={t("about:core.values")} href="/values">
          <Scale />
        </CoreCard>
      </dl>
      <div className="w-full pt-3 my-3 leading-5 text-center">
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
