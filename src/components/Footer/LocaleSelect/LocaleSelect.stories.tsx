import type { Story, Meta } from "@storybook/react";

import { LocaleSelect } from "./LocaleSelect";

export default {
  component: LocaleSelect,
  title: "Footer/LocaleSelect",
} as Meta;

export const _LocaleSelect: Story = () => {
  return <LocaleSelect />;
};

_LocaleSelect.parameters = {
  controls: { hideNoControlsWarning: true },
};
