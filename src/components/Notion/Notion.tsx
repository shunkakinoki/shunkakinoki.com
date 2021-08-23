/* eslint-disable @typescript-eslint/no-unsafe-call */

import type { PagesRetrieveResponse } from "@notionhq/client/build/src/api-endpoints";
import type { Block, RichText } from "@notionhq/client/build/src/api-types";
import clsx from "clsx";
import { Fragment } from "react";
import type { FC } from "react";

import s from "./Notion.module.css";

import { useViews } from "@/hooks/useViews";

export type Props = {
  blocks: Block[];
  content: PagesRetrieveResponse;
  pageId: string;
  locale?: string;
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
    case "heading_2":
      return (
        <h2>
          <Text text={block["heading_2"].text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3>
          <Text text={block["heading_3"].text} />
        </h3>
      );
    case "bulleted_list_item":
      return (
        <li>
          <Text text={block["bulleted_list_item"].text} />
        </li>
      );
    case "numbered_list_item":
      return (
        <li>
          <Text text={block["numbered_list_item"].text} />
        </li>
      );
    case "to_do":
      return (
        <div>
          <label htmlFor={block.id}>
            <input
              className="text-indigo-600 ring-indigo-300"
              type="checkbox"
              id={block.id}
              defaultChecked={block["to_do"].checked}
            />{" "}
            <Text text={block["to_do"].text} />
          </label>
        </div>
      );
    default:
  }
};

export const Notion: FC<Props> = ({ blocks, content, pageId, locale }) => {
  const { isLoading, views } = useViews(`/${pageId}`);

  return (
    <section className="px-3 text-black dark:text-white">
      <div className="pb-3">
        <h1 className="mb-4 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-warmGray-800 dark:text-white line-clamp-3">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          {content.properties.Name?.title[0]?.plain_text}
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-2 w-full">
          <div className="flex items-center">
            <p className="text-lg text-gray-500 dark:text-gray-300">
              by Shun Kakinoki &middot;{" "}
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              {new Date(content.properties.Date?.date?.start).toLocaleString(
                locale,
                {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                },
              )}
            </p>
          </div>
          <div className="flex items-center">
            {isLoading && (
              <div className="flex space-x-4 animate-pulse">
                <div className="w-8 h-3 bg-gray-300 dark:bg-gray-400 rounded-full" />
              </div>
            )}
            <h3 className="mt-2 md:mt-0 min-w-min text-sm text-warmGray-500 dark:text-warmGray-300">
              {!isLoading && views}
              &nbsp;Views
            </h3>
          </div>
        </div>
      </div>
      <div className={s.notion}>
        {blocks.map(block => {
          return <Fragment key={block.id}>{renderBlock(block)}</Fragment>;
        })}
      </div>
    </section>
  );
};
