/* eslint-disable @typescript-eslint/no-unsafe-call */

import { marked } from "marked";

import { sanitizeHtml } from "next-og-utils";
import type { CSSProperties, FC } from "react";

export const mdToHTML = (text: string): string => {
  return marked(text);
};

export const Markdown: FC<{
  children: string;
  className?: string;
  style?: CSSProperties;
}> = ({ children, style, ...props }) => {
  return (
    <div
      className={`markdown ${props.className}`}
      dangerouslySetInnerHTML={{ __html: mdToHTML(sanitizeHtml(children)) }}
      style={style}
    />
  );
};
