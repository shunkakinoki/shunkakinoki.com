import type { FC } from "react";

import { Container } from "@/common/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Product } from "@/components/Product";
import { Seo } from "@/components/Seo";

export const ProductScreen: FC = () => {
  return (
    <>
      <Seo title="Product" />
      <Header />
      <Container>
        <Product />
      </Container>
      <Footer />
    </>
  );
};
