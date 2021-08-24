import type { FC } from "react";

import { Container } from "@/common/Container";
import { Dashboard } from "@/components/Dashboard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Seo } from "@/components/Seo";

export const DashboardScreen: FC = () => {
  return (
    <>
      <Seo title="Dashboard" />
      <Header />
      <Container>
        <Dashboard />
      </Container>
      <Footer />
    </>
  );
};
