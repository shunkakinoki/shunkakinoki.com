import type { FC } from "react";

interface Props {
  children: string;
}

export const ErrorText: FC<Props> = ({ children }) => {
  return (
    <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:mb-6 md:text-5xl lg:mb-9 lg:text-9xl">
      {children}
    </h1>
  );
};
