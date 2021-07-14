import useSWR from "swr";

import DashboardCard from "@/components/Dashboard/DashboardCard";
import { SocialLinks } from "@/const";
import { Instagram } from "@/icons";
import fetcher from "@/lib/fetcher";

export default function InstagramCard(): JSX.Element {
  const { data } = useSWR<{
    followers: number;
  }>("/api/instagram", fetcher);

  return (
    <DashboardCard
      number={data?.followers}
      href={SocialLinks.instagram}
      title="Instagram Followers"
    >
      <Instagram />
    </DashboardCard>
  );
}
