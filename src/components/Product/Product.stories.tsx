import type { Story, Meta } from "@storybook/react";

import type { Props } from "./Product";
import Product from "./Product";

export default {
  component: Product,
  title: "Product",
} as Meta;

export const _Product: Story<Props> = args => {
  return <Product {...args} />;
};

_Product.args = {
  isPartial: false,
};
