import { useRouter } from "next/router";
import { useEffect } from "react";
import type { FC } from "react";

export const Analytics: FC = () => {
  const { asPath } = useRouter();

  useEffect(() => {
    const registerView = (path: string) => {
      return fetch(`/api/views/${path}`, {
        method: "POST",
      });
    };

    void registerView(asPath === "/" ? "root" : asPath);
  }, [asPath]);

  return <></>;
};
