import { ThumbUpIcon } from "@heroicons/react/outline";
import type { FC } from "react";

import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { SocialLinks } from "@/const";
import { useAnalytics } from "@/hooks/useAnalytics";

export const LikeCard: FC = () => {
  const { number } = useAnalytics("likes");

  return (
    <DashboardCard
      number={number}
      href={SocialLinks.website}
      title="Total Likes"
    >
      <ThumbUpIcon className="w-6 h-6" />
    </DashboardCard>
  );
};
