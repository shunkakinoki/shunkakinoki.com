import type { IConfig } from "next-og-utils";

import { layouts } from "@/layouts";

export const DEFAULT_CONFIG: IConfig = {
  fileType: "png",
  layoutName: layouts[0].name,
};
