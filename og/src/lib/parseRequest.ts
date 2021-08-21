/* eslint-disable import/no-unresolved */

import type { NextApiRequest } from "next";

import type { IConfig, ILayoutConfig } from "next-og-utils";

import { DEFAULT_CONFIG } from "@/const/config";
import { getLayoutConfigFromQuery } from "@/layouts";

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
