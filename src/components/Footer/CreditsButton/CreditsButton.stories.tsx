import type { Story, Meta } from "@storybook/react";

import CreditsButton from "./CreditsButton";

export default {
  component: CreditsButton,
  title: "Footer/CreditsButton",
} as Meta;

export const _CreditsButton: Story = () => {
  return <CreditsButton />;
};

_CreditsButton.parameters = {
  controls: { hideNoControlsWarning: true },
};
