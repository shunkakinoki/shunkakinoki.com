"use client";

import { usePathname, useRouter } from "@/navigation";
import type { blockWithChildren, richText } from "@/services/notion";
import { BaseImage } from "@lightdotso/elements/base-image";
import { Checkbox } from "@lightdotso/ui/components/checkbox";
import type { GetPageResponse } from "@notionhq/client/build/src/api-endpoints";
import clsx from "clsx";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { type FC, Fragment, type ReactNode } from "react";
import { useEffect } from "react";
import "@/styles/notion.css";
import {
  ArrowUpRightFromSquareIcon,
  BookmarkCheckIcon,
  Globe2Icon,
} from "lucide-react";
import type { SuccessResult } from "open-graph-scraper/types";

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
    <section className="w-full text-text">
      {/* @ts-ignore */}
      {content.properties.Date?.date && (
        <div className="pb-3">
          <h1 className="-mb-[0.2em] line-clamp-3 pt-[0.2em] pb-1.5 font-bold text-3xl text-text tracking-tight md:text-5xl lg:text-6xl">
            {/* @ts-ignore */}
            {content.properties.Name?.title[0]?.plain_text}
          </h1>
          <div className="mt-2 flex w-full flex-col items-start justify-between md:flex-row md:items-center">
            <div className="flex items-center">
              <p className="text-text-weak">
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
                "rounded-md border border-border bg-background-strong px-1 font-mono text-sm text-text-weak",
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
                className="inline-flex flex-1 justify-center gap-0.5 break-all text-text-info leading-4 hover:text-text-info-strong"
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
      return <hr className="my-6 border border-border" />;
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
        <div className="my-4 rounded-lg border border-border bg-background-strong p-3">
          <BookmarkCheckIcon className="mr-2 inline-block h-4 w-4" />
          {/* @ts-ignore */}
          <Text text={block.callout.rich_text as richText[]} />
        </div>
      );
    case "bookmark":
    case "link_preview": {
      // @ts-ignore
      const url = block.bookmark?.url ?? block.link_preview?.url;
      const ogData = block?.openGraphData
        ? (JSON.parse(block?.openGraphData) as SuccessResult)
        : null;

      // Generate a notion style bookmark card
      return (
        <div className="my-4 break-all rounded-lg border border-border p-3">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group transition-opacity duration-300 hover:opacity-80"
          >
            {ogData?.result?.ogImage?.[0]?.url ? (
              <div className="relative aspect-video">
                <BaseImage
                  width={1200}
                  height={630}
                  className="!pt-0"
                  src={ogData?.result?.ogImage[0]?.url}
                  alt={ogData.result.ogTitle ?? ""}
                />
                <div className="absolute bottom-6 left-2 rounded-md bg-black bg-opacity-50 p-1 text-white text-xs">
                  {ogData.result.ogTitle}
                </div>
              </div>
            ) : null}
            <div className="inline-flex items-center">
              <Globe2Icon className="mr-2 inline-block h-4 w-4 text-text-weak" />
              <span className="mr-1.5 text-text-weak">From:</span>
              <span className="text-text-info group-hover:text-text-info-stronger group-hover:underline">
                {url}
              </span>
              <ArrowUpRightFromSquareIcon className="ml-1 inline-block h-4 w-4 text-text-info group-hover:text-text-info-strong" />
            </div>
          </a>
        </div>
      );
    }
    case "quote":
      return (
        <div className="border-border border-l-4 pl-4 text-text italic">
          {/* @ts-ignore */}
          <Text text={block.quote.rich_text as richText[]} />
        </div>
      );
    case "to_do":
      return (
        <div className="items-top flex space-x-2 py-2">
          <Checkbox
            disabled
            className="mt-0.5 cursor-not-allowed font-medium text-sm leading-none"
            id={block.id}
          />
          <div className="grid gap-1.5 leading-none">
            <label htmlFor={block.id}>
              <Text
                // @ts-ignore
                text={block.to_do.rich_text}
                className="inline-block cursor-not-allowed whitespace-pre-wrap break-words font-medium text-sm text-text leading-normal"
              />
            </label>
          </div>
        </div>
      );
    case "image":
      return (
        <BaseImage
          width={1200}
          height={630}
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
      return null;
  }
};
