import type { Story, Meta } from "@storybook/react";

import type { Props } from "./ProductCard";
import ProductCard from "./ProductCard";

export default {
  component: ProductCard,
  title: "Product/ProductCard",
} as Meta;

export const _ProductCard: Story<Props> = args => {
  return (
    <ProductCard {...args}>
      <></>
    </ProductCard>
  );
};

_ProductCard.args = {
  description: "ProductCard",
  name: "Product",
  href: "/",
};
