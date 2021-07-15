import clsx from "clsx";

export interface Props {
  children: string;
  isPartial?: boolean;
}

export default function SectionText({
  children,
  isPartial = false,
}: Props): JSX.Element {
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
}
