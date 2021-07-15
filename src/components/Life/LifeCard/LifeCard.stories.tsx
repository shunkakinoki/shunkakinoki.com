import type { Story, Meta } from "@storybook/react";

import type { Props } from "./LifeCard";
import LifeCard from "./LifeCard";

export default {
  component: LifeCard,
  title: "Life/LifeCard",
} as Meta;

export const _Life: Story<Props> = args => {
  return (
    <LifeCard {...args}>
      <></>
    </LifeCard>
  );
};

_Life.args = {
  color: "red",
  href: "/",
  name: "LifeCard",
};
