import type { FC } from "react";
import useSWR from "swr";

import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { SocialLinks } from "@/const";
import { Twitter } from "@/icons";
import fetcher from "@/lib/fetcher";

export const TwitterCard: FC = () => {
  const { data } = useSWR<{ followers: number }>("/api/twitter", fetcher);

  return (
    <DashboardCard
      number={data?.followers}
      href={SocialLinks.twitter}
      title="Twitter Followers"
    >
      <Twitter />
    </DashboardCard>
  );
};
