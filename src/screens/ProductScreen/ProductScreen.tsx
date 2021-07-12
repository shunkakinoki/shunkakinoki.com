import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Product from "@/components/Product";

export default function ProductScreen(): JSX.Element {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-start mx-auto max-w-2xl">
        <Product />
      </div>
      <Footer />
    </>
  );
}
