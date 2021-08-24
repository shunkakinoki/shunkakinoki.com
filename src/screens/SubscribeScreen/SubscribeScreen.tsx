import type { FC } from "react";

import { Container } from "@/common/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Newsletter } from "@/components/Newsletter";
import { Seo } from "@/components/Seo";

export const SubscribeScreen: FC = () => {
  return (
    <>
      <Seo title="Social" />
      <Header />
      <Container>
        <Newsletter />
      </Container>
      <Footer />
    </>
  );
};
