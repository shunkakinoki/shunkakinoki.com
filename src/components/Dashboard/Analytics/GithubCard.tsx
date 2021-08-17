import type { FC } from "react";

import { FaGithub } from "react-icons/fa";

import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { SocialLinks } from "@/const";
import { useAnalytics } from "@/hooks/useAnalytics";

export const GithubCard: FC = () => {
  const { number } = useAnalytics("github");

  return (
    <DashboardCard
      number={number}
      href={SocialLinks.github}
      title="GitHub Followers"
    >
      <FaGithub className="w-6 h-6" />
    </DashboardCard>
  );
};
