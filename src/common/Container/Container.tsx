import type { FC, PropsWithChildren } from "react";

export const Container: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-start mx-auto max-w-2xl">
      {children}
    </div>
  );
};
