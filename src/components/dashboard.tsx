import { getTotalViewCount, getTotalVisitorCount } from "@/services/redis";
import {
  getFollowerCount,
  getLatestPublishedTweetCount,
} from "@/services/twitter";
import {
  DocumentTextIcon,
  EyeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import { type FC, Suspense } from "react";
import { PageHeader, PageHeaderHeading } from "./page-header";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const Dashboard: FC = () => {
  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------

  const t = useTranslations();

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <section className="mb-2 w-full">
      <PageHeader>
        <PageHeaderHeading>{t("dashboard.title")}</PageHeaderHeading>
      </PageHeader>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <ViewCard />
        <VisitorCard />
        <TwitterCard />
        <TweetCard />
      </dl>
    </section>
  );
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export async function ViewCard() {
  // ---------------------------------------------------------------------------
  // Services
  // ---------------------------------------------------------------------------

  const { totalViews } = await getTotalViewCount();

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <Suspense
      fallback={
        <DashboardCard number={undefined} title="Total Views">
          <EyeIcon className="h-6 w-6" />
        </DashboardCard>
      }
    >
      <DashboardCard number={totalViews ?? 0} title="Total Views">
        <EyeIcon className="h-6 w-6" />
      </DashboardCard>
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export async function VisitorCard() {
  // ---------------------------------------------------------------------------
  // Services
  // ---------------------------------------------------------------------------

  const { totalVisitorCount } = await getTotalVisitorCount();

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <Suspense
      fallback={
        <DashboardCard number={undefined} title="Total Visitors">
          <UserGroupIcon className="h-6 w-6" />
        </DashboardCard>
      }
    >
      <DashboardCard number={totalVisitorCount ?? 0} title="Total Visitors">
        <UserGroupIcon className="h-6 w-6" />
      </DashboardCard>
    </Suspense>
  );
}

export async function TwitterCard() {
  const followerCount = await getFollowerCount();

  return (
    <Suspense
      fallback={
        <DashboardCard number={undefined} title="Twitter Followers">
          <TwitterLogoIcon className="h-6 w-6" />
        </DashboardCard>
      }
    >
      <DashboardCard
        number={followerCount}
        title="Twitter Followers"
        href="https://twitter.com/shunkakinoki"
      >
        <TwitterLogoIcon className="h-6 w-6" />
      </DashboardCard>
    </Suspense>
  );
}

export async function TweetCard() {
  const latestPublishedTweetCount = await getLatestPublishedTweetCount();

  return (
    <Suspense
      fallback={
        <DashboardCard number={undefined} title="Latest Published Tweets">
          <DocumentTextIcon className="h-6 w-6" />
        </DashboardCard>
      }
    >
      <DashboardCard
        number={latestPublishedTweetCount}
        title="Latest Published Tweets"
        href="https://twitter.com/shunkakinoki"
      >
        <DocumentTextIcon className="h-6 w-6" />
      </DashboardCard>
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

export interface Props {
  // biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
  children: JSX.Element;
  href?: string;
  number: number | undefined;
  title: string;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const DashboardCard: FC<Props> = ({ children, href, number, title }) => {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800">
      <a
        href={href || "#"}
        target={href ? "_blank" : undefined}
        rel={href ? "noopener noreferrer" : undefined}
        className="block"
      >
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md bg-indigo-500 p-3 text-white">
              {children}
            </div>
            <div className="ml-5 w-0 flex-1">
              <dt className="truncate font-medium text-gray-500 text-sm dark:text-gray-400">
                {title}
              </dt>
              <dd className="flex items-baseline">
                {number ? (
                  <div className="font-semibold text-2xl text-gray-900 dark:text-gray-300">
                    {number.toLocaleString()}
                  </div>
                ) : (
                  <div className="h-8 w-9/12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                )}
              </dd>
            </div>
            {href ? (
              <div className="flex-shrink-0 text-white">
                <ArrowTopRightOnSquareIcon className="h-6 w-6" />
              </div>
            ) : null}
          </div>
        </div>
      </a>
    </div>
  );
};
