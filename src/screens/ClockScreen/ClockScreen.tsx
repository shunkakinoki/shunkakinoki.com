import type { FC } from "react";

import { Container } from "@/common/Container";
import { Clock } from "@/components/Clock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Seo } from "@/components/Seo";

export const ClockScreen: FC = () => {
  return (
    <>
      <Seo title="Clock" />
      <Header />
      <Container>
        <Clock />
      </Container>
      <Footer />
    </>
  );
};
