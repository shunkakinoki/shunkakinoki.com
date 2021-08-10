import { Markdown } from "@/components/Markdown";
import type { ILayout, LayoutComponent, GetCSSFn } from "@/og";
import { css } from "@/og";

const getCSS: GetCSSFn = () => {
  return css`
    body {
      font-size: 200px;
      color: #fff;
      background: linear-gradient(to bottom right, skyblue, deeppink);
    }
  `;
};

const Component: LayoutComponent = ({ config }) => {
  return <Markdown>{config.Text}</Markdown>;
};

export const Simple: ILayout = {
  name: "Simple",
  properties: [{ name: "Text", type: "text", default: "**Hello** _World_" }],
  Component,
  getCSS,
};
