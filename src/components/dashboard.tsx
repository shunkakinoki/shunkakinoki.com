import { getTotalViewCount, getTotalVisitorCount } from "@/services/redis";
import { EyeIcon } from "@heroicons/react/24/outline";
import { type FC, Suspense } from "react";
import { DashboardCard } from "./dashboard-card";
import { PageHeader, PageHeaderHeading } from "./page-header";

export async function ViewCard() {
  // ---------------------------------------------------------------------------
  // Service
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

export async function VisitorCard() {
  // ---------------------------------------------------------------------------
  // Service
  // ---------------------------------------------------------------------------

  const { totalVisitorCount } = await getTotalVisitorCount();

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <Suspense
      fallback={
        <DashboardCard number={undefined} title="Total Visitors">
          <EyeIcon className="h-6 w-6" />
        </DashboardCard>
      }
    >
      <DashboardCard number={totalVisitorCount ?? 0} title="Total Visitors">
        <EyeIcon className="h-6 w-6" />
      </DashboardCard>
    </Suspense>
  );
}

// export async function TwitterCard() {
//   const followerCount = await getFollowerCount();

//   return (
//     <Suspense
//       fallback={
//         <DashboardCard number={undefined} title="Twitter Followers">
//           <TwitterLogoIcon className="h-6 w-6" />
//         </DashboardCard>
//       }
//     >
//       <DashboardCard number={followerCount} title="Twitter Followers">
//         <TwitterLogoIcon className="h-6 w-6" />
//       </DashboardCard>
//     </Suspense>
//   );
// }

export const Dashboard: FC = () => {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <section className="mb-2 w-full">
      <PageHeader>
        <PageHeaderHeading>Dashboard</PageHeaderHeading>
      </PageHeader>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <ViewCard />
        <VisitorCard />
        {/* <TwitterCard /> */}
      </dl>
    </section>
  );
};
