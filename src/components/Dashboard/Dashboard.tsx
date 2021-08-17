import type { FC } from "react";

import { SectionText } from "@/common/Text";
import {
  ButtondownCard,
  GithubCard,
  TwitterCard,
  ViewCard,
  LikeCard,
} from "@/components/Dashboard/Analytics";

export const Dashboard: FC = () => {
  return (
    <section className="mb-2 w-full">
      <div className="px-3 md:px-0">
        <SectionText>Dashboard</SectionText>
      </div>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
        <ButtondownCard />
        <GithubCard />
        <TwitterCard />
        <ViewCard />
        <LikeCard />
      </dl>
    </section>
  );
};
