import { InternalConfig } from "@/config/internal";
import { SocialConfig } from "@/config/social";
import { queryCloudflareAnalytics } from "@/services/cloudflare";
import { getCachedDatabaseStats } from "@/services/notion";
import { getTotalViewCount, getTotalVisitorCount } from "@/services/redis";
import {
  getFollowerCount,
  getImpressionCount,
  getLatestPublishedTweetCount,
} from "@/services/twitter";
import {
  DocumentMagnifyingGlassIcon,
  DocumentTextIcon,
  EyeIcon,
  GlobeAmericasIcon,
  StarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { DumbbellIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { type FC, Suspense } from "react";
import { FaRunning } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";
import { MdSportsMartialArts } from "react-icons/md";
import { SiBlockbench } from "react-icons/si";
import { PageHeader, PageHeaderHeading } from "../components/page-header.ts";

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
    <section class="mb-2 w-full">
      <PageHeader>
        <PageHeaderHeading>{t("dashboard.title")}</PageHeaderHeading>
      </PageHeader>
      <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <ViewCard />
        <VisitorCard />
        <TwitterCard />
        <TweetCard />
        <TweetImpressionsCard />
        <CloudflareCard />
        <TotalLiftedCard />
        <TotalRunningCard />
        <SquatCard />
        <BenchCard />
        <DeadLiftCard />
        <MaxedOutCard />
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
          <EyeIcon class="h-6 w-6" />
        </DashboardCard>
      }
    >
      <DashboardCard number={totalViews ?? 0} title="Total Views">
        <EyeIcon class="h-6 w-6" />
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
          <UserGroupIcon class="h-6 w-6" />
        </DashboardCard>
      }
    >
      <DashboardCard number={totalVisitorCount ?? 0} title="Total Visitors">
        <UserGroupIcon class="h-6 w-6" />
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
          <TwitterLogoIcon class="h-6 w-6" />
        </DashboardCard>
      }
    >
      <DashboardCard
        number={followerCount}
        title="Twitter Followers"
        href={SocialConfig.X}
      >
        <TwitterLogoIcon class="h-6 w-6" />
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
          <DocumentTextIcon class="h-6 w-6" />
        </DashboardCard>
      }
    >
      <DashboardCard
        number={latestPublishedTweetCount}
        title="Latest Published Tweets"
        href={SocialConfig.X}
        suffix="tweets"
      >
        <DocumentTextIcon class="h-6 w-6" />
      </DashboardCard>
    </Suspense>
  );
}

export async function TweetImpressionsCard() {
  const latestPublishedTweetCount = await getImpressionCount();

  return (
    <Suspense
      fallback={
        <DashboardCard number={undefined} title="Twitter Impressions">
          <DocumentMagnifyingGlassIcon class="h-6 w-6" />
        </DashboardCard>
      }
    >
      <DashboardCard
        number={latestPublishedTweetCount}
        title="Twitter Impressions"
        href={SocialConfig.TypefullyStats}
      >
        <DocumentMagnifyingGlassIcon class="h-6 w-6" />
      </DashboardCard>
    </Suspense>
  );
}

export async function CloudflareCard() {
  const data = await queryCloudflareAnalytics();

  return (
    <Suspense
      fallback={
        <DashboardCard number={undefined} title="Cloudflare Analytics">
          <GlobeAmericasIcon class="h-6 w-6" />
        </DashboardCard>
      }
    >
      <DashboardCard number={data} title="Cloudflare Analytics">
        <GlobeAmericasIcon class="h-6 w-6" />
      </DashboardCard>
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export async function TotalLiftedCard() {
  // ---------------------------------------------------------------------------
  // Services
  // ---------------------------------------------------------------------------

  const res = await getCachedDatabaseStats();
  const totalLifted =
    res?.["table:uncategorized:L\\Bo:sum"]?.aggregationResult?.value;

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <Suspense
      fallback={
        <DashboardCard number={undefined} title="Total Lifted">
          <DumbbellIcon class="h-6 w-6" />
        </DashboardCard>
      }
    >
      <DashboardCard
        number={totalLifted}
        title="Total Lifted"
        href={InternalConfig.Stats}
        suffix="lbs"
      >
        <DumbbellIcon class="h-6 w-6" />
      </DashboardCard>
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export async function TotalRunningCard() {
  const res = await getCachedDatabaseStats();
  const totalRunning =
    res?.["table:uncategorized:QCJk:sum"]?.aggregationResult?.value;

  return (
    <Suspense
      fallback={
        <DashboardCard number={undefined} title="Total Running">
          <FaRunning class="h-6 w-6" />
        </DashboardCard>
      }
    >
      <DashboardCard
        number={totalRunning}
        title="Total Running"
        suffix="km"
        href={InternalConfig.Stats}
      >
        <FaRunning class="h-6 w-6" />
      </DashboardCard>
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export async function SquatCard() {
  // ---------------------------------------------------------------------------
  // Services
  // ---------------------------------------------------------------------------

  const res = await getCachedDatabaseStats();
  const maxSquat =
    res?.["table:uncategorized:htQ<:max"]?.aggregationResult?.value;

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <Suspense
      fallback={
        <DashboardCard number={undefined} title="Max Squat">
          <MdSportsMartialArts class="h-6 w-6" />
        </DashboardCard>
      }
    >
      <DashboardCard
        number={maxSquat}
        title="Max Squat"
        href={InternalConfig.Stats}
        suffix="lbs"
      >
        <MdSportsMartialArts class="h-6 w-6" />
      </DashboardCard>
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export async function BenchCard() {
  const res = await getCachedDatabaseStats();
  const maxBench =
    res?.["table:uncategorized:mLup:max"]?.aggregationResult?.value;

  return (
    <Suspense
      fallback={
        <DashboardCard number={undefined} title="Max Bench">
          <SiBlockbench class="h-6 w-6" />
        </DashboardCard>
      }
    >
      <DashboardCard
        number={maxBench}
        title="Max Bench"
        href={InternalConfig.Stats}
        suffix="lbs"
      >
        <SiBlockbench class="h-6 w-6" />
      </DashboardCard>
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export async function DeadLiftCard() {
  const res = await getCachedDatabaseStats();
  const maxDeadLift =
    res?.["table:uncategorized:A[_n:max"]?.aggregationResult?.value;

  return (
    <Suspense
      fallback={
        <DashboardCard number={undefined} title="Max DeadLift">
          <GiWeightLiftingUp class="h-6 w-6" />
        </DashboardCard>
      }
    >
      <DashboardCard
        number={maxDeadLift}
        title="Max DeadLift"
        href={InternalConfig.Stats}
        suffix="lbs"
      >
        <GiWeightLiftingUp class="h-6 w-6" />
      </DashboardCard>
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export async function MaxedOutCard() {
  const res = await getCachedDatabaseStats();
  const maxedOutValue =
    res?.["table:uncategorized:B?Vi:percent_checked"]?.aggregationResult?.value;
  const maxedOutPercentage = Number((maxedOutValue * 100).toFixed(2));

  return (
    <Suspense
      fallback={
        <DashboardCard number={undefined} title="Maxed Out">
          <StarIcon class="h-6 w-6" />
        </DashboardCard>
      }
    >
      <DashboardCard
        number={maxedOutPercentage}
        title="Maxed Out"
        suffix="%"
        href={InternalConfig.Stats}
      >
        <StarIcon class="h-6 w-6" />
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
  suffix?: string;
  title: string;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const DashboardCard: FC<Props> = ({
  children,
  href,
  number,
  suffix,
  title,
}) => {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div class="overflow-hidden rounded-lg bg-background-strong hover:bg-background-stronger">
      <a
        href={href || "#"}
        target={href ? "_blank" : undefined}
        rel={href ? "noopener noreferrer" : undefined}
        class="block"
      >
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 rounded-md bg-indigo-500 p-3 text-white">
              {children}
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="truncate font-medium text-text-weak">{title}</dt>
              <dd class="flex items-baseline">
                {number ? (
                  <div class="font-semibold text-2xl text-text">
                    {number.toLocaleString()}
                    {suffix ? (
                      <span class="ml-1 text-lg text-text-weak">{suffix}</span>
                    ) : null}
                  </div>
                ) : (
                  <div class="h-8 w-9/12 animate-pulse rounded bg-background-stronger" />
                )}
              </dd>
            </div>
            {href ? (
              <div class="flex-shrink-0 text-text">
                <ArrowTopRightOnSquareIcon class="h-6 w-6" />
              </div>
            ) : null}
          </div>
        </div>
      </a>
    </div>
  );
};
