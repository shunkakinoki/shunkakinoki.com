import type { FC } from "react";

import { FaTwitter } from "react-icons/fa";

import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { SocialLinks } from "@/const";
import { useAnalytics } from "@/hooks/useAnalytics";

export const TwitterCard: FC = () => {
  const { number } = useAnalytics("twitter");

  return (
    <DashboardCard
      number={number}
      href={SocialLinks.twitter}
      title="Twitter Followers"
    >
      <FaTwitter className="w-6 h-6" />
    </DashboardCard>
  );
};
