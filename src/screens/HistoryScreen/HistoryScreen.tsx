import type { FC } from "react";

import { Container } from "@/common/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { History } from "@/components/History";
import { Seo } from "@/components/Seo";

export const HistoryScreen: FC = () => {
  return (
    <>
      <Seo title="History" />
      <Header />
      <Container>
        <History />
      </Container>
      <Footer />
    </>
  );
};
