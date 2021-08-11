import type { FC } from "react";
import useSWR from "swr";

import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { SocialLinks } from "@/const";
import { User } from "@/icons";
import { fetcher } from "@/lib/fetcher";

export const ButtondownCard: FC = () => {
  const { data } = useSWR<{
    subscribers: number;
  }>("/api/buttondown", fetcher);

  return (
    <DashboardCard
      number={data?.subscribers}
      href={SocialLinks.website}
      title="Newsletter Subscribers"
    >
      <User />
    </DashboardCard>
  );
};
