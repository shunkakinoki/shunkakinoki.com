import { Blog } from "./Blog";
import { Journal } from "./Journal";
import { Simple } from "./Simple";

import type { ILayout, ILayoutConfig } from "@/og";

export const layouts: ILayout[] = [Simple, Blog, Journal];

export const getDefaultLayout = (layout: ILayout): ILayoutConfig => {
  const config: ILayoutConfig = {};

  for (const p of layout.properties) {
    if (p.default != null) {
      config[p.name] = p.default?.toString();
    }
  }

  return config;
};

export const getLayoutConfigFromQuery = (
  layoutName: string,
  query: Record<string, string | string[]>,
): ILayoutConfig => {
  const layout = layouts.find(l => {
    return l.name === layoutName;
  });

  if (layout == null) {
    return {};
  }

  const config: ILayoutConfig = getDefaultLayout(layout);
  for (const p of layout.properties) {
    if (query[p.name] != null) {
      config[p.name] = query[p.name].toString();
    }
  }

  return config;
};
