import Dashboard from "@/components/Dashboard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function DashboardScreen(): JSX.Element {
  return (
    <>
      <Header />
      <div className="flex items-start justify-center max-w-2xl mx-auto">
        <Dashboard />
      </div>
      <Footer />
    </>
  );
}
