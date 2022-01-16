import type { FC } from "react";

import { SectionText } from "@/common/Text";
import {
  NewsletterCard,
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
      <dl className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2">
        <ViewCard />
        <LikeCard />
        <NewsletterCard />
        <GithubCard />
        <TwitterCard />
      </dl>
    </section>
  );
};
