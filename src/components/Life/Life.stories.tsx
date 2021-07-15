import type { Story, Meta } from "@storybook/react";

import type { Props } from "./Life";
import Life from "./Life";

export default {
  component: Life,
  title: "Life",
} as Meta;

export const _Life: Story<Props> = args => {
  return <Life {...args} />;
};

_Life.args = {
  isPartial: false,
};
