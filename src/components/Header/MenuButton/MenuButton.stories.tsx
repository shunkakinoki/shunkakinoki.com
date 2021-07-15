import type { Story, Meta } from "@storybook/react";

import MenuButton from "./MenuButton";

export default {
  component: MenuButton,
  title: "Header/MenuButton",
} as Meta;

export const _MenuButton: Story = () => {
  return <MenuButton />;
};

_MenuButton.parameters = {
  controls: { hideNoControlsWarning: true },
};
