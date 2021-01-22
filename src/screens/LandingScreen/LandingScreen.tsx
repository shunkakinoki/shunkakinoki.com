import Header from "@/components/Header";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Social from "@/components/Social";
import History from "@/components/History";
import Product from "@/components/Product";
import Newsletter from "@/components/Newsletter";

export default function LandingScreen(): JSX.Element {
  return (
    <>
      <Header />
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto">
        <About isPartial />
        <Product isPartial />
        <History isPartial />
        <Social isPartial />
        <Newsletter />
      </div>
      <Footer />
    </>
  );
}
