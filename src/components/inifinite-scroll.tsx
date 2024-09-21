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

import { Button } from "@lightdotso/ui/components/button";
import { type ReactNode, useCallback, useEffect, useRef } from "react";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface InfiniteScrollProps<T> {
  items: T[];
  loadMore: () => Promise<void>;
  hasMore: boolean;
  isLoading: boolean;
  renderItem: (item: T, index: number) => ReactNode;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function InfiniteScroll<T>({
  items,
  loadMore,
  hasMore,
  isLoading,
  renderItem,
}: InfiniteScrollProps<T>) {
  // ---------------------------------------------------------------------------
  // Ref Hooks
  // ---------------------------------------------------------------------------

  const observer = useRef<IntersectionObserver | null>(null);

  // ---------------------------------------------------------------------------
  // Callback Hooks
  // ---------------------------------------------------------------------------

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMore, loadMore],
  );

  // ---------------------------------------------------------------------------
  // Effect Hooks
  // ---------------------------------------------------------------------------

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <>
      {items?.map((item, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <div key={index} ref={index === items.length - 1 ? lastItemRef : null}>
          {renderItem(item, index)}
        </div>
      ))}
      <div className="flex justify-center">
        {isLoading && (
          <Button isLoading variant="outline">
            Loading more items...
          </Button>
        )}
        {!hasMore && (
          <Button disabled variant="outline">
            No more items to load
          </Button>
        )}
      </div>
    </>
  );
}
