import type { Story, Meta } from "@storybook/react";

import type { Props } from "./SocialCard";
import SocialCard from "./SocialCard";

export default {
  component: SocialCard,
  title: "Social/SocialCard",
} as Meta;

export const _SocialCard: Story<Props> = args => {
  return (
    <SocialCard {...args}>
      <></>
    </SocialCard>
  );
};

_SocialCard.args = {
  isPriority: false,
  href: "",
  title: "SocialCard",
};
