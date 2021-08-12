import type { FC } from "react";

import { Dashboard } from "@/components/Dashboard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Seo } from "@/components/Seo";

export const DashboardScreen: FC = () => {
  return (
    <>
      <Seo title="Dashboard" />
      <Header />
      <div className="flex justify-center items-start mx-auto max-w-2xl">
        <Dashboard />
      </div>
      <Footer />
    </>
  );
};
