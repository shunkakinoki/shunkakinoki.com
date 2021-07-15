import type { Story, Meta } from "@storybook/react";

import MobileMenu from "./MobileMenu";

export default {
  component: MobileMenu,
  title: "Header/MobileMenu",
} as Meta;

export const _MobileMenu: Story = () => {
  return <MobileMenu />;
};

_MobileMenu.parameters = {
  controls: { hideNoControlsWarning: true },
};
