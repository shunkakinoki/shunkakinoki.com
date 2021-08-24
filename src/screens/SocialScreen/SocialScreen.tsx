import type { FC } from "react";

import { Container } from "@/common/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Seo } from "@/components/Seo";
import { Social } from "@/components/Social";

export const SocialScreen: FC = () => {
  return (
    <>
      <Seo title="Social" />
      <Header />
      <Container>
        <Social />
      </Container>
      <Footer />
    </>
  );
};
