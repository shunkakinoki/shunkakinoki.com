import type { NextApiRequest } from "next";

import { DEFAULT_CONFIG } from "@/const/config";
import { getLayoutConfigFromQuery } from "@/layouts";
import type { IConfig, ILayoutConfig } from "@/og";

export const parseRequest = (req: NextApiRequest): IConfig & ILayoutConfig => {
  const config: IConfig = {
    ...DEFAULT_CONFIG,
    ...req.query,
  };

  const layoutConfig = getLayoutConfigFromQuery(config.layoutName, req.query);

  return {
    ...config,
    ...layoutConfig,
  };
};
