/* eslint-disable @typescript-eslint/no-unsafe-call */

import type { GetPageResponse } from "@notionhq/client/build/src/api-endpoints";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { Fragment } from "react";
import type { FC } from "react";
import { Tweet } from "react-twitter-widgets";

import s from "./Notion.module.css";

import { LikeButton } from "@/components/Notion/LikeButton";
import { useViews } from "@/hooks/useViews";
import type { blockWithChildren, richText } from "@/lib/notion";

export type Props = {
  blocks: blockWithChildren[];
  content: GetPageResponse;
  pageId: string;
  locale?: string;
};

export type TextProps = {
  text: richText[];
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

const renderBlock = (block: blockWithChildren, theme: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  switch (block.type) {
    case "paragraph":
      return (
        <p>
          <Text text={block["paragraph"].text as richText[]} />
        </p>
      );
    case "heading_1":
      return (
        <h1>
          <Text text={block["heading_1"].text as richText[]} />
        </h1>
      );
    case "heading_2":
      return (
        <h2>
          <Text text={block["heading_2"].text as richText[]} />
        </h2>
      );
    case "heading_3":
      return (
        <h3>
          <Text text={block["heading_3"].text as richText[]} />
        </h3>
      );
    case "bulleted_list_item":
      return (
        <li>
          <Text text={block["bulleted_list_item"].text as richText[]} />
        </li>
      );
    case "numbered_list_item":
      return (
        <li>
          <Text text={block["numbered_list_item"].text as richText[]} />
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
            <Text text={block["to_do"].text as richText[]} />
          </label>
        </div>
      );
    case "image":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          alt={block["image"]?.caption[0]?.plain_text ?? "Notion Image"}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          src={block["image"]?.file?.url ?? block["image"]?.external?.url}
        />
      );
    case "embed":
      if (block["embed"].url.includes("twitter.com")) {
        return (
          <Tweet
            tweetId={
              /twitter.com\/.*\/status(?:es)?\/([^/?]+)/.exec(
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                block["embed"].url,
              )[1]
            }
            options={{
              theme: theme,
              align: "center",
              cards: "hidden",
            }}
          />
        );
      }
      break;
    default:
  }
};

export const Notion: FC<Props> = ({ blocks, content, pageId, locale }) => {
  const { isLoading, views } = useViews(pageId);
  const { theme } = useTheme();

  return (
    <section className="px-3 w-full text-black dark:text-white">
      <div className="pb-3">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-warmGray-800 dark:text-white line-clamp-3 md:text-5xl lg:text-6xl">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          {content.properties.Name?.title[0]?.plain_text}
        </h1>
        <div className="flex flex-col justify-between items-start mt-2 w-full md:flex-row md:items-center">
          <div className="flex items-center">
            <p className="text-lg text-gray-500 dark:text-gray-300">
              by Shun Kakinoki &middot;{" "}
              {new Date(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                content.properties.Date?.date?.start ??
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                  content.properties.Created?.created_time,
              ).toLocaleString(locale, {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex justify-center items-center">
            {isLoading ||
              (views === 1 && (
                <div className="flex space-x-4 animate-pulse">
                  <div className="w-8 h-3 bg-gray-300 dark:bg-gray-400 rounded-full" />
                </div>
              ))}
            <h3 className="min-w-min text-sm text-warmGray-500 dark:text-warmGray-300 ">
              {!isLoading && views !== 1 && views.toLocaleString()}
              &nbsp;Views
            </h3>
          </div>
        </div>
      </div>
      <div className={s.notion}>
        {blocks.map(block => {
          return (
            <Fragment key={block.id}>{renderBlock(block, theme)}</Fragment>
          );
        })}
      </div>
      <div className="flex justify-center pt-6 pb-4 space-x-8">
        <LikeButton pageId={pageId} />
      </div>
    </section>
  );
};
