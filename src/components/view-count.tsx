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

import { getIp } from "@/lib/headers";
import { incrementViewCount, incrementVisitorCount } from "@/services/redis";
import { Suspense } from "react";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

export type ViewCountProps = {
  pageId: string;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export async function ViewCount({ pageId }: ViewCountProps) {
  // ---------------------------------------------------------------------------
  // Services
  // ---------------------------------------------------------------------------

  const ip = getIp();

  // Only run on prodution
  let views = 0;
  if (process.env.NODE_ENV === "production") {
    const result = await Promise.all([
      incrementViewCount(pageId),
      incrementVisitorCount(ip ?? "121.0.0.1", pageId),
    ]);
    views = result[0].views;
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="flex items-center justify-center">
      <Suspense
        fallback={
          <div className="flex animate-pulse space-x-4">
            <div className="h-3 w-8 rounded-full bg-background-stronger" />
          </div>
        }
      >
        <h3 className="min-w-min text-sm text-text-weak">
          {views.toLocaleString()}
          &nbsp;Views
        </h3>
      </Suspense>
    </div>
  );
}
