import type { Story, Meta } from "@storybook/react";

import type { Props } from "./Social";
import Social from "./Social";

export default {
  component: Social,
  title: "Social",
} as Meta;

export const _Social: Story<Props> = args => {
  return <Social {...args} />;
};

_Social.args = {
  isPartial: false,
};
