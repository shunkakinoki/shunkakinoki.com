import type { FC } from "react";

export const Container: FC = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-start mx-auto max-w-2xl">
      {children}
    </div>
  );
};
