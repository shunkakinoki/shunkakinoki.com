import type { FC } from "react";

import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { SocialLinks } from "@/const";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Github } from "@/icons";

export const GithubCard: FC = () => {
  const { number } = useAnalytics("github");

  return (
    <DashboardCard
      number={number}
      href={SocialLinks.github}
      title="GitHub Followers"
    >
      <Github />
    </DashboardCard>
  );
};
