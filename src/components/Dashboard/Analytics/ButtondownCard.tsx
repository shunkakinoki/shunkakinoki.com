import type { FC } from "react";

import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { SocialLinks } from "@/const";
import { useAnalytics } from "@/hooks/useAnalytics";
import { User } from "@/icons";

export const ButtondownCard: FC = () => {
  const { number } = useAnalytics("buttondown");

  return (
    <DashboardCard
      number={number}
      href={SocialLinks.website}
      title="Newsletter Subscribers"
    >
      <User />
    </DashboardCard>
  );
};
