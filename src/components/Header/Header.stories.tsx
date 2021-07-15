import type { Story, Meta } from "@storybook/react";

import Header from "./Header";

export default {
  component: Header,
  title: "Header",
} as Meta;

export const _Header: Story = () => {
  return <Header />;
};

_Header.parameters = {
  controls: { hideNoControlsWarning: true },
};
