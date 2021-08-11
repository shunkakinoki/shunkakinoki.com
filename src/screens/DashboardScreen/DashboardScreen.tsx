import type { FC } from "react";

import { Dashboard } from "@/components/Dashboard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const DashboardScreen: FC = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center items-start mx-auto max-w-2xl">
        <Dashboard />
      </div>
      <Footer />
    </>
  );
};
