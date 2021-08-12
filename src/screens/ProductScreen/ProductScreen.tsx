import type { FC } from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Product } from "@/components/Product";
import { Seo } from "@/components/Seo";

export const ProductScreen: FC = () => {
  return (
    <>
      <Seo title="Product" />
      <Header />
      <div className="flex flex-col justify-center items-start mx-auto max-w-2xl">
        <Product />
      </div>
      <Footer />
    </>
  );
};
