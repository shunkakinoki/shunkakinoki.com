// Copyright 2023-2024 Shun Kakinoki.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
import { notFound } from "next/navigation";
import { Suspense } from "react";

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = await getCachedPage((await params).slug);

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
}: { params: Promise<{ locale: string; slug: string }> }) {
  // ---------------------------------------------------------------------------
  // Services
  // ---------------------------------------------------------------------------

  // Omit the slug to get the valid uuid
  const pageId = extractValidUUID((await params).slug);

  if (!pageId) {
    notFound();
  }

  // Get the page
  const page = await getCachedPage(pageId);

  // @ts-ignore
  const pageEmoji = page?.icon?.emoji ?? "📄";

  const getCachedBlocksRecursively = async (
    blockId: string,
  ): Promise<blockWithChildren[]> => {
    const blocks = await getCachedBlocks(blockId);
    return await Promise.all(
      blocks.map(async (block) => {
        // @ts-ignore
        if (block.has_children) {
          const children = await getCachedBlocksRecursively(block.id);
          return { ...block, children };
        }
        return block;
      }),
    );
  };

  const fetchOpenGraphData = async (block: blockWithChildren) => {
    // @ts-ignore
    const url = block.bookmark?.url ?? block.link_preview?.url;
    if (url) {
      const ogData = await getCachedOpenGraphData({ url });
      block.openGraphData = ogData;
    }
    return block;
  };

  const processBlockRecursively = async (
    block: blockWithChildren,
  ): Promise<blockWithChildren> => {
    if (block.children) {
      block.children = await Promise.all(
        block.children.map(processBlockRecursively),
      );
    }

    // @ts-ignore
    if (block.type === "link_preview" || block.type === "bookmark") {
      return await fetchOpenGraphData(block);
    }

    return block;
  };

  // Main function
  const getProcessedBlocks = async (
    slug: string,
  ): Promise<blockWithChildren[]> => {
    const blocks = await getCachedBlocksRecursively(slug);
    return await Promise.all(blocks.map(processBlockRecursively));
  };

  // Usage
  const blocksWithOpenGraphData = await getProcessedBlocks((await params).slug);

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
