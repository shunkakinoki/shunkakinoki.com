import type { FC } from "react";
import useSWR from "swr";

import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { SocialLinks } from "@/const";
import { Github } from "@/icons";
import { fetcher } from "@/lib/fetcher";

export const GithubCard: FC = () => {
  const { data } = useSWR<{
    followers: number;
  }>("/api/github", fetcher);

  return (
    <DashboardCard
      number={data?.followers}
      href={SocialLinks.github}
      title="GitHub Followers"
    >
      <Github />
    </DashboardCard>
  );
};
