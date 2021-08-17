import type { FC } from "react";

import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { SocialLinks } from "@/const";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Instagram } from "@/icons";

export const InstagramCard: FC = () => {
  const { number } = useAnalytics("instagram");

  return (
    <DashboardCard
      number={number}
      href={SocialLinks.instagram}
      title="Instagram Followers"
    >
      <Instagram />
    </DashboardCard>
  );
};
