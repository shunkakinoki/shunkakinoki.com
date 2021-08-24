import type { Story, Meta } from "@storybook/react";

import type { Props } from "./LikeButton";
import { LikeButton } from "./LikeButton";

export default {
  component: LikeButton,
  title: "Life/LifeCard",
} as Meta;

export const _LikeButton: Story<Props> = args => {
  return (
    <LikeButton {...args}>
      <></>
    </LikeButton>
  );
};

_LikeButton.args = {};
