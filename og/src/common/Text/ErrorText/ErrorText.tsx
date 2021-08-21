import type { FC } from "react";

interface Props {
  children: string;
}

export const ErrorText: FC<Props> = ({ children }) => {
  return (
    <h1 className="mb-4 md:mb-6 lg:mb-9 text-3xl md:text-5xl lg:text-9xl font-bold tracking-tight text-black dark:text-white">
      {children}
    </h1>
  );
};
