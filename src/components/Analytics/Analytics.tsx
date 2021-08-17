import { useRouter } from "next/router";
import { useEffect } from "react";
import type { FC } from "react";

import { useViews } from "@/hooks/useViews";

export const Analytics: FC = () => {
  const { asPath } = useRouter();
  const { isLoading, views, mutate } = useViews(
    asPath === "/" ? "root" : asPath,
  );

  useEffect(() => {
    if (!isLoading && views) {
      console.log(`Views on ${asPath}: ${views}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, views]);

  useEffect(() => {
    const registerView = (path: string) => {
      void mutate(views + 1, false);
      void fetch(`/api/views/${path}`, {
        method: "POST",
      });
      void mutate();
    };

    void registerView(asPath === "/" ? "root" : asPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath]);

  return <></>;
};
