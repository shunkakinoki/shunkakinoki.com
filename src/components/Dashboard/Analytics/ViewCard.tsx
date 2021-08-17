import { EyeIcon } from "@heroicons/react/outline";
import type { FC } from "react";

import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { SocialLinks } from "@/const";
import { useAnalytics } from "@/hooks/useAnalytics";

export const ViewCard: FC = () => {
  const { number } = useAnalytics("views");

  return (
    <DashboardCard
      number={number}
      href={SocialLinks.website}
      title="Total Views"
    >
      <EyeIcon className="w-6 h-6" />
    </DashboardCard>
  );
};
