import clsx from "clsx";

interface Props {
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
        "my-3 text-lg font-medium leading-loose text-gray-600 align-baseline dark:text-gray-300",
        isPartial && "md:text-xl",
        !isPartial && "md:text-3xl md:my-6"
      )}
    >
      {children}
    </h3>
  );
}
