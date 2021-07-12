import Footer from "@/components/Footer";
import Header from "@/components/Header";
import History from "@/components/History";

export default function HistoryScreen(): JSX.Element {
  return (
    <>
      <Header />
      <div className="flex justify-center items-start mx-auto max-w-2xl">
        <History />
      </div>
      <Footer />
    </>
  );
}
