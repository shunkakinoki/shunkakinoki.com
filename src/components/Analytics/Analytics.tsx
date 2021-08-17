import { useRouter } from "next/router";
import { useEffect } from "react";
import type { FC } from "react";

import { useViews } from "@/hooks/useViews";

export const Analytics: FC = () => {
  const { asPath } = useRouter();
  const { isLoading, views } = useViews(asPath === "/" ? "root" : asPath);

  useEffect(() => {
    if (!isLoading) {
      console.log(`Views on ${asPath}: ${views}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, views]);

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
