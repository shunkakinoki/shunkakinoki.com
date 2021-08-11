import clsx from "clsx";
import type { FC } from "react";

export interface Props {
  children: string;
  isPartial?: boolean;
}

export const SectionText: FC<Props> = ({ children, isPartial = false }) => {
  return (
    <h3
      className={clsx(
        "my-3 text-lg font-medium leading-loose text-gray-800 dark:text-gray-300 align-baseline",
        isPartial && "md:text-xl",
        !isPartial && "md:my-6 md:text-3xl",
      )}
    >
      {children}
    </h3>
  );
};
