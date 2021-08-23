/* eslint-disable @typescript-eslint/no-unsafe-call */

import type { PagesRetrieveResponse } from "@notionhq/client/build/src/api-endpoints";
import type { Block, RichText } from "@notionhq/client/build/src/api-types";
import clsx from "clsx";
import { Fragment } from "react";
import type { FC } from "react";

import s from "./Notion.module.css";

export type Props = {
  blocks: Block[];
  content: PagesRetrieveResponse;
};

export type TextProps = {
  text: RichText[];
};

export const Text: FC<TextProps> = ({ text }) => {
  return (
    <>
      {text.map((value, id) => {
        const {
          annotations: { bold, code, italic, strikethrough, underline },
          plain_text,
          href,
        } = value;
        return (
          <span
            key={id}
            className={clsx(
              bold && "font-extrabold",
              code && "py-3 px-2 font-mono",
              italic && "italic",
              strikethrough && "line-through",
              underline && "underline",
            )}
          >
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-coolGray-500 dark:hover:text-coolGray-400"
              >
                {plain_text}
              </a>
            ) : (
              plain_text
            )}
          </span>
        );
      })}
    </>
  );
};

const renderBlock = (block: Block) => {
  switch (block.type) {
    case "paragraph":
      return (
        <p>
          <Text text={block["paragraph"].text} />
        </p>
      );
    case "heading_1":
      return (
        <h1>
          <Text text={block["heading_1"].text} />
        </h1>
      );
    default:
  }
};

export const Notion: FC<Props> = ({ blocks, content }) => {
  return (
    <section className="px-3 text-black dark:text-white">
      <div className="px-3 md:px-0 pb-3">
        <h1 className="mb-4 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-warmGray-800 dark:text-white">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          {content.properties.Name?.title[0]?.plain_text}
        </h1>
      </div>
      <div className={s.notion}>
        {blocks.map(block => {
          return <Fragment key={block.id}>{renderBlock(block)}</Fragment>;
        })}
      </div>
    </section>
  );
};
