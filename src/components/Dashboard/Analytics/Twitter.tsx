import useSWR from "swr";
import { Twitter } from "@/icons";
import fetcher from "@/lib/fetcher";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import { SocialLinks } from "@/const";

export default function TwitterCard(): JSX.Element {
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
}
