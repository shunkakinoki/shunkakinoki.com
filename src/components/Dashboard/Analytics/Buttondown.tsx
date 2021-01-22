import useSWR from "swr";
import { User } from "@/icons";
import fetcher from "@/lib/fetcher";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import { SocialLinks } from "@/const";

export default function ButtondownCard(): JSX.Element {
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
}
