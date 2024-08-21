"use client";

import { usePathname, useRouter } from "@/navigation";
import type { blockWithChildren, richText } from "@/services/notion";
import type { GetPageResponse } from "@notionhq/client/build/src/api-endpoints";
import clsx from "clsx";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { type FC, Fragment, type ReactNode } from "react";
import { useEffect } from "react";
import "@/styles/notion.css";
import { ArrowUpRightFromSquareIcon, BookmarkCheckIcon } from "lucide-react";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

export type NotionProps = {
  viewCount: ReactNode;
  blocks: blockWithChildren[];
  content: GetPageResponse;
  pageId: string;
  locale?: "en" | "ja" | "zh" | undefined;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const Notion: FC<NotionProps> = ({
  viewCount,
  blocks,
  content,
  locale,
}) => {
  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------

  const currentLocale = useLocale();

  // ---------------------------------------------------------------------------
  // Hooks
  // ---------------------------------------------------------------------------

  const { theme } = useTheme();

  // ---------------------------------------------------------------------------
  // Next Hooks
  // ---------------------------------------------------------------------------

  const router = useRouter();
  const pathname = usePathname();

  // ---------------------------------------------------------------------------
  // Effect Hooks
  // ---------------------------------------------------------------------------

  // Switch locale to the current locale
  useEffect(() => {
    if (locale && currentLocale !== locale) {
      router.push(pathname, { locale });
    }
  }, [locale, currentLocale, pathname, router]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <section className="w-full text-black dark:text-white">
      {/* @ts-ignore */}
      {content.properties.Date?.date && (
        <div className="pb-3">
          <h1 className="mb-4 line-clamp-3 font-bold text-3xl text-warmGray-800 tracking-tight md:text-5xl lg:text-6xl dark:text-white">
            {/* @ts-ignore */}
            {content.properties.Name?.title[0]?.plain_text}
          </h1>
          <div className="mt-2 flex w-full flex-col items-start justify-between md:flex-row md:items-center">
            <div className="flex items-center">
              <p className="text-gray-500 text-lg dark:text-gray-300">
                by Shun Kakinoki &middot;{" "}
                {new Date(
                  //@ts-ignore
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                  content.properties.Date?.date?.start ??
                    //@ts-ignore
                    content.properties.Created?.created_time,
                ).toLocaleString(locale, {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>
            {viewCount}
          </div>
        </div>
      )}
      <div className="notion">
        {blocks.map((block) => {
          return (
            <Fragment key={block.id}>
              {renderBlock(block, theme ?? "system")}
            </Fragment>
          );
        })}
      </div>
      <div className="flex justify-center space-x-8 pt-6 pb-4">
        {/* <LikeButton pageId={pageId} /> */}
      </div>
    </section>
  );
};

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

export type TextProps = {
  className?: string;
  text: richText[];
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const Text: FC<TextProps> = ({ text, className }) => {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <>
      {text?.map((value) => {
        const {
          annotations: { bold, code, italic, strikethrough, underline },
          plain_text,
          href,
        } = value;
        return (
          <span
            key={value.plain_text}
            className={clsx(
              bold && "font-extrabold",
              code &&
                "rounded-md border border-gray-400 bg-gray-300 p-1 font-mono text-gray-800 text-xs dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100",
              italic && "italic",
              strikethrough && "line-through",
              underline && "underline",
              className,
            )}
          >
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 justify-center gap-0.5 break-all text-indigo-500 leading-4 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200"
              >
                {plain_text === "Untitled" ? "<REDACTED>" : plain_text}
                <ArrowUpRightFromSquareIcon className="h-2 w-2 shrink-0" />
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

// -----------------------------------------------------------------------------
// Renderer
// -----------------------------------------------------------------------------

const renderBlock = (block: blockWithChildren, _theme: string) => {
  //@ts-ignore
  switch (block.type) {
    case "divider":
      return <hr className="my-6 border-gray-200 dark:border-gray-400" />;
    case "paragraph":
      return (
        <p>
          {/* @ts-ignore */}
          <Text text={block.paragraph.rich_text as richText[]} />
        </p>
      );
    case "heading_1":
      return (
        <h1>
          {/* @ts-ignore */}
          <Text text={block.heading_1.rich_text as richText[]} />
        </h1>
      );
    case "heading_2":
      return (
        <h2>
          {/* @ts-ignore */}
          <Text text={block.heading_2.rich_text as richText[]} />
        </h2>
      );
    case "heading_3":
      return (
        <h3>
          {/* @ts-ignore */}
          <Text text={block.heading_3.rich_text as richText[]} />
        </h3>
      );
    case "bulleted_list_item":
      return (
        <li>
          {/* @ts-ignore */}
          <Text text={block.bulleted_list_item.rich_text as richText[]} />
        </li>
      );
    case "numbered_list_item":
      return (
        <li>
          {/* @ts-ignore */}
          <Text text={block.numbered_list_item.rich_text as richText[]} />
        </li>
      );
    case "callout":
      return (
        <div className="my-4 rounded-lg border border-gray-300 bg-gray-100 p-3 dark:border-gray-600 dark:bg-gray-800">
          <BookmarkCheckIcon className="mr-2 inline-block h-4 w-4" />
          {/* @ts-ignore */}
          <Text text={block.callout.rich_text as richText[]} />
        </div>
      );
    case "bookmark":
    case "link_preview":
      // @ts-ignore
      // biome-ignore lint/style/useSingleCaseStatement: <explanation>
      // biome-ignore lint/correctness/noSwitchDeclarations: <explanation>
      const url = block.bookmark?.url ?? block.link_preview?.url;

      // Generate a notion style bookmark card
      return (
        <div className="my-4 break-all rounded-lg border border-gray-300 p-3 dark:border-gray-600">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-400 hover:underline"
          >
            {url}
            <ArrowUpRightFromSquareIcon className="ml-1 inline-block h-4 w-4" />
          </a>
        </div>
      );
    case "quote":
      return (
        <div className="border-gray-400 border-l-4 pl-4 text-gray-800 italic dark:text-gray-200">
          {/* @ts-ignore */}
          <Text text={block.quote.rich_text as richText[]} />
        </div>
      );
    case "to_do":
      return (
        <div className="flex items-start">
          <label
            className="flex cursor-not-allowed items-center gap-1.5 pt-[0.30rem]"
            htmlFor={block.id}
          >
            <input
              disabled
              className="rounded-sm text-indigo-600 ring-indigo-300"
              type="checkbox"
              id={block.id}
              // @ts-ignore
              defaultChecked={block.to_do.checked}
            />
          </label>
          <div className="ml-1.5 flex-1">
            <Text
              // @ts-ignore
              text={block.to_do.rich_text}
              className="inline-block whitespace-pre-wrap break-words leading-normal"
            />
          </div>
        </div>
      );
    case "image":
      return (
        <img
          //@ts-ignore
          alt={block.image?.caption[0]?.plain_text ?? "Notion Image"}
          //@ts-ignore
          src={block.image?.file?.url ?? block.image?.external?.url}
        />
      );
    case "embed":
      //   if (block["embed"].url.includes("twitter.com")) {
      // return (
      //   <Tweet
      //     tweetId={
      //       /twitter.com\/.*\/status(?:es)?\/([^/?]+)/.exec(
      //         block["embed"].url,
      //       )[1]
      //     }
      //     options={{
      //       theme: theme,
      //       align: "center",
      //       cards: "hidden",
      //     }}
      //   />
      // );
      //   }
      break;
    case "synced_block":
      // Return the children of the block
      return (
        <div>
          {/* @ts-ignore */}
          {block.children.map((child) => {
            return (
              <Fragment key={child.id}>{renderBlock(child, _theme)}</Fragment>
            );
          })}
        </div>
      );
    default:
      // biome-ignore lint/suspicious/noConsoleLog: <explanation>
      // biome-ignore lint/style/useSingleCaseStatement: <explanation>
      console.log(`Unsupported block type: ${JSON.stringify(block)}`);
      return null;
  }
};
