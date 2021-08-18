import { UserGroupIcon } from "@heroicons/react/outline";
import type { FC } from "react";

import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { SocialLinks } from "@/const";
import { useAnalytics } from "@/hooks/useAnalytics";

export const ButtondownCard: FC = () => {
  const { number } = useAnalytics("buttondown");

  return (
    <DashboardCard
      number={number}
      href={SocialLinks.website}
      title="Newsletter Subscribers"
    >
      <UserGroupIcon className="w-6 h-6" />
    </DashboardCard>
  );
};
