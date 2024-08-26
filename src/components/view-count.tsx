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

  const [{ views }] = await Promise.all([
    incrementViewCount(pageId),
    incrementVisitorCount(ip ?? "121.0.0.1", pageId),
  ]);

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
