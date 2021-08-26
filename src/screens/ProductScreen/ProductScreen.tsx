import type { FC } from "react";

import { Container } from "@/common/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { Props as ProductProps } from "@/components/Product";
import { Product } from "@/components/Product";
import { Seo } from "@/components/Seo";

export type Props = ProductProps;

export const ProductScreen: FC<Props> = ({ database }) => {
  return (
    <>
      <Seo title="Product" />
      <Header />
      <Container>
        <Product database={database} />
      </Container>
      <Footer />
    </>
  );
};
