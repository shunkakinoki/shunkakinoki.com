import type { Story, Meta } from "@storybook/react";

import { Newsletter } from "./Newsletter";

export default {
  component: Newsletter,
  title: "Newsletter",
} as Meta;

export const _Newsletter: Story = () => {
  return <Newsletter />;
};

_Newsletter.parameters = {
  controls: { hideNoControlsWarning: true },
};
