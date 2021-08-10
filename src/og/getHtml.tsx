import { renderToString } from "react-dom/server";

import { getCommonCSS } from "./css";

import type { IConfig, ILayout, ILayoutConfig, LayoutComponent } from "./types";

const NotImplemented: LayoutComponent = ({ config }) => {
  return <h1 style={{ fontSize: 100 }}>{config.layoutName} not implemented</h1>;
};

export const getHtml = (
  config: IConfig & ILayoutConfig,
  layouts: ILayout[],
): string => {
  const layout = layouts.find(l => {
    return l.name === config.layoutName;
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const rendered = renderToString(
    layout?.Component != null ? (
      <layout.Component config={config} />
    ) : (
      <NotImplemented config={config} />
    ),
  );

  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      ${getCommonCSS()}
      ${layout?.getCSS != null ? layout.getCSS(config) : ""}
    </style>
    <body>
      ${rendered}
    </body>
</html>`;
};
