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

import { getPostsAction } from "@/actions/getPostsAction";
import { Posts } from "@/sections/posts";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
// import type { Metadata } from "next";
// import { getTranslations } from "next-intl/server";
import { connection } from "next/server";
import { Suspense } from "react";

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

// export async function generateMetadata({
//   params,
// }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
//   // ---------------------------------------------------------------------------
//   // Server
//   // ---------------------------------------------------------------------------

//   await connection();

//   // ---------------------------------------------------------------------------
//   // i18n
//   // ---------------------------------------------------------------------------

//   const t = await getTranslations({ locale: (await params).locale });

//   // ---------------------------------------------------------------------------
//   // Return
//   // ---------------------------------------------------------------------------

//   return {
//     title: t("posts.title"),
//     description: t("posts.description"),
//   };
// }

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

// biome-ignore lint/suspicious/useAwait: <explanation>
// biome-ignore lint/style/noDefaultExport: <explanation>
export default async function PostsPage() {
  // ---------------------------------------------------------------------------
  // Server
  // ---------------------------------------------------------------------------

  await connection();

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <Suspense fallback={null}>
      <PostsInnerPage />
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Inner Page
// -----------------------------------------------------------------------------

async function PostsInnerPage() {
  // ---------------------------------------------------------------------------
  // Server
  // ---------------------------------------------------------------------------

  await connection();

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => getPostsAction(pageParam),
    initialPageParam: undefined,
  });

  // ---------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------

  const initialData = await getPostsAction();

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Posts initialData={initialData} />
    </HydrationBoundary>
  );
}
