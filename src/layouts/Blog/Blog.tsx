/* eslint-disable @typescript-eslint/no-unsafe-call */
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
      margin: 75px 0;
    }

    h2 {
      font-size: 60px;
      margin-top: 25px;
    }

    h3 {
      margin-top: 45px;
      text-align: right;
      font-size: 30px;
      color: ${colours.gray};
    }
  `;
};

const Component: LayoutComponent = ({ config }) => {
  const title = config.Title;
  const author = config.Author;
  const url = config.Url;
  const date = config.Date;
  const username = config.Username;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <h1>
        <Markdown>{title}</Markdown>
      </h1>
      <h2 style={{ display: "flex" }}>
        <Markdown style={{ fontWeight: 400 }}>Written by&nbsp;</Markdown>
        <Markdown>{author}</Markdown>
        <h3>
          {date}
          {url && "・"}
          {url}
          {username && "・@"}
          {username}
        </h3>
      </h2>
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
      name: "Author",
      type: "text",
      default: "Shun",
      placeholder: "Big Author",
    },
    {
      name: "Username",
      type: "text",
      default: "Your username",
      placeholder: "shunkakinoki",
    },
    {
      name: "Date",
      type: "text",
      default: "1",
      placeholder: "2021/0",
    },
    {
      name: "Url",
      type: "text",
      placeholder: "https://og.sentrei.com",
    },
  ],
  Component,
  getCSS,
};
