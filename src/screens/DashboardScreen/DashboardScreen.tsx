import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Dashboard from "@/components/Dashboard";

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
