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

import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { InternalConfig } from "@/config/internal";
import { SocialConfig } from "@/config/social";
import { getCloudflareAnalytics } from "@/services/cloudflare";
import { getDatabaseStats } from "@/services/notion";
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
        href={SocialConfig.X}
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
        href={SocialConfig.X}
      >
        <DocumentTextIcon className="h-6 w-6" />
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
          <DocumentMagnifyingGlassIcon className="h-6 w-6" />
        </DashboardCard>
      }
    >
      <DashboardCard
        number={latestPublishedTweetCount}
        title="Twitter Impressions"
        href={SocialConfig.TypefullyStats}
      >
        <DocumentMagnifyingGlassIcon className="h-6 w-6" />
      </DashboardCard>
    </Suspense>
  );
}

export async function CloudflareCard() {
  const data = await getCloudflareAnalytics();

  return (
    <Suspense
      fallback={
        <DashboardCard number={undefined} title="Cloudflare Analytics">
          <GlobeAmericasIcon className="h-6 w-6" />
        </DashboardCard>
      }
    >
      <DashboardCard number={data} title="Cloudflare Analytics">
        <GlobeAmericasIcon className="h-6 w-6" />
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

  const res = await getDatabaseStats();
  const totalLifted =
    res?.["table:uncategorized:L\\Bo:sum"]?.aggregationResult?.value;

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <Suspense
      fallback={
        <DashboardCard number={undefined} title="Total Lifted">
          <DumbbellIcon className="h-6 w-6" />
        </DashboardCard>
      }
    >
      <DashboardCard
        number={totalLifted}
        title="Total Lifted"
        href={InternalConfig.Stats}
        suffix="lbs"
      >
        <DumbbellIcon className="h-6 w-6" />
      </DashboardCard>
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export async function TotalRunningCard() {
  const res = await getDatabaseStats();
  const totalRunning =
    res?.["table:uncategorized:QCJk:sum"]?.aggregationResult?.value;

  return (
    <Suspense
      fallback={
        <DashboardCard number={undefined} title="Total Running">
          <FaRunning className="h-6 w-6" />
        </DashboardCard>
      }
    >
      <DashboardCard
        number={totalRunning}
        title="Total Running"
        suffix="km"
        href={InternalConfig.Stats}
      >
        <FaRunning className="h-6 w-6" />
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

  const res = await getDatabaseStats();
  const maxSquat =
    res?.["table:uncategorized:htQ<:max"]?.aggregationResult?.value;

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <Suspense
      fallback={
        <DashboardCard number={undefined} title="Max Squat">
          <MdSportsMartialArts className="h-6 w-6" />
        </DashboardCard>
      }
    >
      <DashboardCard
        number={maxSquat}
        title="Max Squat"
        href={InternalConfig.Stats}
        suffix="lbs"
      >
        <MdSportsMartialArts className="h-6 w-6" />
      </DashboardCard>
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export async function BenchCard() {
  const res = await getDatabaseStats();
  const maxBench =
    res?.["table:uncategorized:mLup:max"]?.aggregationResult?.value;

  return (
    <Suspense
      fallback={
        <DashboardCard number={undefined} title="Max Bench">
          <SiBlockbench className="h-6 w-6" />
        </DashboardCard>
      }
    >
      <DashboardCard
        number={maxBench}
        title="Max Bench"
        href={InternalConfig.Stats}
        suffix="lbs"
      >
        <SiBlockbench className="h-6 w-6" />
      </DashboardCard>
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export async function DeadLiftCard() {
  const res = await getDatabaseStats();
  const maxDeadLift =
    res?.["table:uncategorized:A[_n:max"]?.aggregationResult?.value;

  return (
    <Suspense
      fallback={
        <DashboardCard number={undefined} title="Max DeadLift">
          <GiWeightLiftingUp className="h-6 w-6" />
        </DashboardCard>
      }
    >
      <DashboardCard
        number={maxDeadLift}
        title="Max DeadLift"
        href={InternalConfig.Stats}
        suffix="lbs"
      >
        <GiWeightLiftingUp className="h-6 w-6" />
      </DashboardCard>
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export async function MaxedOutCard() {
  const res = await getDatabaseStats();
  const maxedOutValue =
    res?.["table:uncategorized:B?Vi:percent_checked"]?.aggregationResult?.value;
  const maxedOutPercentage = Number((maxedOutValue * 100).toFixed(2));

  return (
    <Suspense
      fallback={
        <DashboardCard number={undefined} title="Maxed Out">
          <StarIcon className="h-6 w-6" />
        </DashboardCard>
      }
    >
      <DashboardCard
        number={maxedOutPercentage}
        title="Maxed Out"
        suffix="%"
        href={InternalConfig.Stats}
      >
        <StarIcon className="h-6 w-6" />
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
    <div className="overflow-hidden rounded-lg bg-background-strong hover:bg-background-stronger">
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
              <dt className="truncate font-medium text-text-weak">{title}</dt>
              <dd className="flex items-baseline">
                {number ? (
                  <div className="font-semibold text-2xl text-text">
                    {number.toLocaleString()}
                    {suffix ? (
                      <span className="ml-1 text-lg text-text-weak">
                        {suffix}
                      </span>
                    ) : null}
                  </div>
                ) : (
                  <div className="h-8 w-9/12 animate-pulse rounded bg-background-stronger" />
                )}
              </dd>
            </div>
            {href ? (
              <div className="flex-shrink-0 text-text">
                <ArrowTopRightOnSquareIcon className="h-6 w-6" />
              </div>
            ) : null}
          </div>
        </div>
      </a>
    </div>
  );
};
