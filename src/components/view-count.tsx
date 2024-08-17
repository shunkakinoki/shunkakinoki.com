import { incrementViewCount, incrementVisitorCount } from "@/services/redis";
import { headers } from "next/headers";
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

  const headersList = headers();
  const ip = headersList.get("x-forwarded-for") || "121.0.0.1";

  const [{ views }] = await Promise.all([
    incrementViewCount(pageId),
    incrementVisitorCount(ip, pageId),
  ]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="flex items-center justify-center">
      <Suspense
        fallback={
          <div className="flex animate-pulse space-x-4">
            <div className="h-3 w-8 rounded-full bg-gray-300 dark:bg-gray-400" />
          </div>
        }
      >
        <h3 className="min-w-min text-sm text-warmGray-500 dark:text-warmGray-300 ">
          {views.toLocaleString()}
          &nbsp;Views
        </h3>
      </Suspense>
    </div>
  );
}
