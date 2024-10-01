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

"use client";

import type { BlogResponse } from "@/actions/getBlogAction";
import { getBlogAction } from "@/actions/getBlogAction";
import { InfiniteScroll } from "@/components/inifinite-scroll";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { Link } from "@/navigation";
import type { NotionPageObject } from "@/services/notion";
import { ExternalLink } from "@lightdotso/elements/external-link";
import { type InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

export interface BlogProps {
  locale: string;
  initialData: {
    entries: NotionPageObject[];
    nextCursor: string | undefined;
    hasMore: boolean;
  };
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function Blog({ locale, initialData }: BlogProps) {
  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------

  const t = useTranslations();

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<
      BlogResponse,
      Error,
      InfiniteData<BlogResponse>,
      string[],
      string | undefined
    >({
      refetchOnMount: false,
      refetchOnReconnect: false,
      queryKey: ["blog"],
      queryFn: ({ pageParam }) => getBlogAction(locale, pageParam),
      getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
      initialPageParam: undefined,
      initialData: {
        pages: [initialData],
        pageParams: [undefined],
      },
    });

  // ---------------------------------------------------------------------------
  // Render Utils
  // ---------------------------------------------------------------------------

  const renderBlogEntry = (entry: NotionPageObject) => {
    // @ts-ignore
    const date = new Date(entry.properties.Date.date.start).toLocaleString(
      "en",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      },
    );

    return (
      <div key={entry.id} className="flex space-x-4">
        {/* @ts-ignore */}
        {entry.properties["External Link"]?.url ? (
          <div className="grow">
            <ExternalLink
              // @ts-ignore
              href={entry.properties["External Link"].url}
              className="text-text hover:text-text-weak"
            >
              <span className="line-clamp-1 text-left font-extrabold text-xl md:text-2x">
                {/* @ts-ignore */}
                {entry.properties.Name?.title[0]?.plain_text || ""}
              </span>
            </ExternalLink>
          </div>
        ) : (
          <Link
            // @ts-ignore
            href={`/${entry.id}`}
            className="line-clamp-1 grow text-left font-extrabold text-text text-xl hover:text-text-weak hover:underline md:text-2x"
          >
            {/* @ts-ignore */}
            {entry.properties.Name?.title[0]?.plain_text || ""}
          </Link>
        )}
        <div className="flex-none text-sm text-text-weak">{date}</div>
      </div>
    );
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <section>
      <PageHeader>
        <PageHeaderHeading>{t("blog.title")}</PageHeaderHeading>
      </PageHeader>
      <div className="mt-8 w-full flex-col space-y-3">
        <InfiniteScroll
          items={data?.pages.flatMap((page) => page.entries)}
          loadMore={() => fetchNextPage()}
          hasMore={hasNextPage}
          isLoading={isFetchingNextPage}
          renderItem={renderBlogEntry}
        />
      </div>
    </section>
  );
}
