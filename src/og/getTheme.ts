import type { ILayoutConfig } from "./types";

export const getTheme = (config: ILayoutConfig): string => {
  return config.Theme.toLowerCase();
};
