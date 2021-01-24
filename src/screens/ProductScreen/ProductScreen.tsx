import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Product from "@/components/Product";

export default function ProductScreen(): JSX.Element {
  return (
    <>
      <Header />
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto">
        <Product />
      </div>
      <Footer />
    </>
  );
}
