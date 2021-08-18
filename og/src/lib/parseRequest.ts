import type { NextApiRequest } from "next";

import type { IConfig, ILayoutConfig } from "next-og-utils";

import { getLayoutConfigFromQuery } from "@/layouts";
import { DEFAULT_CONFIG } from "@/og/lib/config";

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
