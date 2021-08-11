import type { Story, Meta } from "@storybook/react";

import { DarkModeButton } from "./DarkModeButton";

export default {
  component: DarkModeButton,
  title: "Header/DarkModeButton",
} as Meta;

export const _DarkModeButton: Story = () => {
  return <DarkModeButton />;
};

_DarkModeButton.parameters = {
  controls: { hideNoControlsWarning: true },
};
