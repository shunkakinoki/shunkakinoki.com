import marked from "marked";
import { sanitizeHtml } from "next-og-utils";
import type { CSSProperties, FC } from "react";

export const mdToHTML = (text: string): string => {
  // TODO: FIX THIS
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
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
