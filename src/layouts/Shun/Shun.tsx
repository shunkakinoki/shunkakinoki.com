/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { ILayout, LayoutComponent, GetCSSFn } from "next-og-utils";
import { css } from "next-og-utils";

import { Markdown } from "@/components/Markdown";

const getCSS: GetCSSFn = () => {
  return css`
    body {
      font-size: 200px;
      color: #fff;
      background: linear-gradient(to left, #743ad5, #d53a9d);
    }
  `;
};

const Component: LayoutComponent = ({ config }) => {
  return <Markdown>{config.Title}</Markdown>;
};

export const Shun: ILayout = {
  name: "Shun",
  properties: [{ name: "Title", type: "text", default: "**Hello** _World_" }],
  Component,
  getCSS,
};
