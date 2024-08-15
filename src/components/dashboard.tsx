import { getTotalViewCount } from "@/services/redis";
import { EyeIcon } from "@heroicons/react/24/outline";
import type { FC } from "react";
import { DashboardCard } from "./dashboard-card";

export const ViewCard: FC = () => {
  const totalViews = getTotalViewCount();

  return (
    <DashboardCard
      number={totalViews}
      href={"https://light.so"}
      title="Total Views"
    >
      <EyeIcon className="h-6 w-6" />
    </DashboardCard>
  );
};

export const Dashboard: FC = () => {
  return (
    <section className="mb-2 w-full">
      <div className="px-3 md:px-0">
        <div className="font-medium text-lg leading-loose">Dashboard</div>
      </div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <ViewCard />
      </dl>
    </section>
  );
};
