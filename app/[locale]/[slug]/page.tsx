import { Notion } from "@/components/notion";
import { ViewCount } from "@/components/view-count";
import { extractValidUUID } from "@/lib/utils";
import { Check } from "@/sections/check";
import { Mind } from "@/sections/mind";
import {
  type blockWithChildren,
  getCachedBlocks,
  getCachedPage,
} from "@/services/notion";
import { getCachedOpenGraphData } from "@/services/ogs";
import type { Metadata } from "next";
import { Suspense } from "react";

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: { params: { slug: string } }): Promise<Metadata> {
  const page = await getCachedPage(params.slug);

  return {
    //@ts-ignore
    title: page.properties?.Name?.title[0]?.plain_text,
    // @ts-ignore
    description: page.properties?.Description?.rich_text[0]?.plain_text,
  };
}

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

// biome-ignore lint/style/noDefaultExport: <explanation>
export default async function SlugPage({
  params,
}: { params: { locale: string; slug: string } }) {
  // ---------------------------------------------------------------------------
  // Services
  // ---------------------------------------------------------------------------

  // Omit the slug to get the valid uuid
  const pageId = extractValidUUID(params.slug);

  if (!pageId) {
    return {
      notFound: true,
      revalidate: 30,
    };
  }

  // Get the page
  const page = await getCachedPage(pageId);

  // @ts-ignore
  const pageEmoji = page?.icon?.emoji ?? "📄";

  if (
    //@ts-ignore
    (page.properties?.Published && !page.properties?.Published?.checkbox) ||
    //@ts-ignore
    (page.properties?.Date && !page.properties.Date?.date?.start)
  ) {
    return {
      notFound: true,
      revalidate: 30,
    };
  }

  const blocks = await getCachedBlocks(params.slug);
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => {
        //@ts-ignore
        return block.has_children;
      })
      .map(async (block) => {
        return {
          id: block.id,
          children: await getCachedBlocks(block.id),
        };
      }),
  );
  const blocksWithChildren = blocks.map((block) => {
    //@ts-ignore
    if (block.has_children) {
      block.children = childBlocks.find((x) => {
        return x.id === block.id;
      })?.children;
    }
    return block;
  });

  const fetchOpenGraphData = async (block: blockWithChildren) => {
    // @ts-ignore
    const url = block.bookmark?.url ?? block.link_preview?.url;
    const ogData = await getCachedOpenGraphData({ url: url });
    // @ts-ignore
    block.openGraphData = ogData;
    return block;
  };
  const processBlock = async (block: blockWithChildren) => {
    if (block?.children) {
      block.children = await Promise.all(
        block.children.map(async (child) => {
          // @ts-ignore
          if (child.type === "link_preview" || child.type === "bookmark") {
            return await fetchOpenGraphData(child);
          }
          return child;
        }),
      );
    }
    // @ts-ignore
    if (block.type === "link_preview" || block.type === "bookmark") {
      return fetchOpenGraphData(block);
    }
    return block;
  };
  const blocksWithOpenGraphData = await Promise.all(
    blocksWithChildren.map(processBlock),
  );

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <>
      <link
        rel="icon"
        href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${pageEmoji}</text></svg>`}
        type="image/svg+xml"
        sizes="any"
      />
      <Notion
        viewCount={<ViewCount pageId={pageId} />}
        blocks={blocksWithOpenGraphData}
        content={page}
        pageId={pageId}
      />
      {
        //@ts-ignore
        page.parent.type === "database_id" &&
          //@ts-ignore
          page.parent.database_id ===
            "badf29d8-7d2f-4e03-b2c5-451a627d8618" && (
            <div className="flex flex-col gap-4 md:gap-8">
              <Suspense>
                <Check
                  // @ts-ignore
                  dateStart={page.properties.Date.date.start}
                />
              </Suspense>
              <Suspense>
                <Mind
                  // @ts-ignore
                  dateStart={page.properties.Date.date.start}
                />
              </Suspense>
            </div>
          )
      }
    </>
  );
}
