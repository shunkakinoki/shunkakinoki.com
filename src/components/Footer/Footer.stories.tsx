import type { Story, Meta } from "@storybook/react";

import { Footer } from "./Footer";

export default {
  component: Footer,
  title: "Footer",
} as Meta;

export const _Footer: Story = () => {
  return <Footer />;
};

_Footer.parameters = {
  controls: { hideNoControlsWarning: true },
};
