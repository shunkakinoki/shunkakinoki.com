import type { GetPageResponse } from "@notionhq/client/build/src/api-endpoints";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { FC } from "react";

import { Container } from "@/common/Container";

import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { History } from "@/components/History";
import { Life } from "@/components/Life";
import { Newsletter } from "@/components/Newsletter";
import { Product } from "@/components/Product";
import { Seo } from "@/components/Seo";
import { Social } from "@/components/Social";

export interface Props {
  source: MDXRemoteSerializeResult;
  database: GetPageResponse[];
}

export const LandingScreen: FC<Props> = ({ source, database }) => {
  return (
    <>
      <Seo />
      <Header />
      <Container>
        <About isPartial source={source} />
        <Product isPartial database={database} />
        <History isPartial />
        <Life isPartial />
        <Social isPartial />
        <Newsletter />
      </Container>
      <Footer />
    </>
  );
};
