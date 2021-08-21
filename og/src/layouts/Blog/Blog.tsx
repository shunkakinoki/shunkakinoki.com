/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable tailwindcss/no-custom-classname */

import type { ILayout, LayoutComponent, GetCSSFn } from "next-og-utils";

import { getTheme, css } from "next-og-utils";

import { Markdown } from "@/components/Markdown";
import { colourThemes, defaultTheme } from "@/const";

const getCSS: GetCSSFn = config => {
  const theme = getTheme(config);
  const colours = colourThemes[theme];

  return css`
    body {
      color: ${colours.fg};
      background: ${colours.bg};
    }

    h1 {
      font-size: 120px;
      margin: 75px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    h2 {
      font-size: 60px;
      margin-top: 25px;
    }

    h3 {
      margin-top: 45px;
      font-size: 36px;
      color: ${colours.gray};
    }

    .gradient-box {
      border: 24px solid;
      border-image-slice: 1;
      border-width: 18px;
      border-image-source: linear-gradient(to left, #743ad5, #d53a9d);
      height: 100%;
      width: 100%;
    }

    .content {
      padding: 30px;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  `;
};

const Component: LayoutComponent = ({ config }) => {
  const title = config.Title;
  const date = config.Date;

  return (
    <div className="gradient-box">
      <div className="content">
        <h1>
          <Markdown>{title}</Markdown>
        </h1>
        <h2>
          Written by&nbsp;Shun&nbsp;Kakinoki
          <h3>
            {date}
            &nbsp;&middot;&nbsp;https://shunkakinoki.com&nbsp;&middot;
            &nbsp;@shunkakinoki
          </h3>
        </h2>
      </div>
    </div>
  );
};

export const Blog: ILayout = {
  name: "Blog",
  properties: [
    {
      name: "Theme",
      type: "select",
      options: ["Light", "Dark"],
      default: defaultTheme,
    },
    {
      name: "Title",
      type: "text",
      default: "The Jamstack Backend",
      placeholder: "Big text",
    },
    {
      name: "Date",
      type: "text",
      default: "2021/01/01",
      placeholder: "2021/01/01",
    },
  ],
  Component,
  getCSS,
};
