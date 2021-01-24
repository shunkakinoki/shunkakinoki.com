import Footer from "@/components/Footer";
import Header from "@/components/Header";
import History from "@/components/History";

export default function HistoryScreen(): JSX.Element {
  return (
    <>
      <Header />
      <div className="flex items-start justify-center max-w-2xl mx-auto">
        <History />
      </div>
      <Footer />
    </>
  );
}
