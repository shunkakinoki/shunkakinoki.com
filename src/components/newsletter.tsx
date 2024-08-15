import { getSubscribersCount } from "@/services/buttondown";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";
import { NewsletterForm } from "./newsletter-form";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type NewsletterProps = {
  tags: string[];
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export async function Newsletter({ tags }: NewsletterProps) {
  // ---------------------------------------------------------------------------
  // Service
  // ---------------------------------------------------------------------------

  const subscribersCount = await getSubscribersCount();

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <section>
      <div className="sm:max-w-3xl lg:max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl bg-indigo-600 px-6 py-8 shadow-xl sm:px-12 sm:py-10">
          <div
            aria-hidden="true"
            className="-mt-72 sm:-mt-32 absolute inset-0 md:mt-0"
          >
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="xMidYMid slice"
              fill="none"
              viewBox="0 0 1463 360"
            >
              <path
                className="text-indigo-500 text-opacity-40"
                fill="currentColor"
                d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
              />
              <path
                className="text-indigo-700 text-opacity-40"
                fill="currentColor"
                d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
              />
            </svg>
          </div>
          <div className="relative">
            <div>
              <h2 className="font-extrabold text-lg text-white tracking-tighter sm:text-2xl">
                Subscribe to my newsletter.
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-indigo-200">
                Get the latest posts delivered right to your inbox.
              </p>
            </div>
            <NewsletterForm tags={tags} />
            <p className="mx-auto mt-4 flex max-w-2xl items-center align-text-bottom font-medium text-indigo-50 text-xs">
              <LightBulbIcon className="h-4 w-4 pr-1" />
              <Suspense
                fallback={
                  <div className="flex animate-pulse space-x-4">
                    <div className="h-3 w-6 rounded-full bg-gray-300 dark:bg-gray-400" />
                  </div>
                }
              >
                {subscribersCount ? (
                  <>{subscribersCount?.toLocaleString()} Subscribers</>
                ) : null}
              </Suspense>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
