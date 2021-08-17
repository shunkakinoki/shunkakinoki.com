import type { FC } from "react";

import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { SocialLinks } from "@/const";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Twitter } from "@/icons";

export const TwitterCard: FC = () => {
  const { number } = useAnalytics("twitter");

  return (
    <DashboardCard
      number={number}
      href={SocialLinks.twitter}
      title="Twitter Followers"
    >
      <Twitter />
    </DashboardCard>
  );
};
