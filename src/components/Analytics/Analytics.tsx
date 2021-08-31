import { useRouter } from "next/router";
import { useEffect } from "react";
import type { FC } from "react";

import { useViews } from "@/hooks/useViews";

export const Analytics: FC = () => {
  const { asPath } = useRouter();
  const { views, mutate } = useViews(asPath === "/" ? "root" : asPath);

  useEffect(() => {
    const path = asPath.split(/[?#]/)[0].substring(1);
    const registerView = (path: string) => {
      void mutate({ views: views + 1 }, false);
      void fetch(`/api/views${path}`, {
        method: "POST",
      });
      void mutate();
    };

    void registerView(path === "/" ? "root" : path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath]);

  return <></>;
};
