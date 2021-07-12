import Dashboard from "@/components/Dashboard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function DashboardScreen(): JSX.Element {
  return (
    <>
      <Header />
      <div className="flex justify-center items-start mx-auto max-w-2xl">
        <Dashboard />
      </div>
      <Footer />
    </>
  );
}
