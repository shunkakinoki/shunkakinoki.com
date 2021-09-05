import { useRouter } from "next/router";
import { useEffect } from "react";
import type { FC } from "react";

import { useViews } from "@/hooks/useViews";

export const Analytics: FC = () => {
  const { asPath } = useRouter();
  const parsedPath = asPath.split(/[?#]/)[0];
  const path = parsedPath === "/" ? "root" : parsedPath.substring(1);
  const { views, mutate } = useViews(path);

  useEffect(() => {
    const registerView = (path: string) => {
      void mutate({ views: views + 1 }, false);
      void fetch(`/api/views/${path}`, {
        method: "POST",
      });
      void mutate();
    };

    void registerView(path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return <></>;
};
