import About, { Props as AboutProps } from "@/components/About";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import History from "@/components/History";
import Newsletter from "@/components/Newsletter";
import Product from "@/components/Product";
import Social from "@/components/Social";

export type Props = AboutProps;

export default function LandingScreen({ source }: Props): JSX.Element {
  return (
    <>
      <Header />
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto">
        <About isPartial source={source} />
        <Product isPartial />
        <History isPartial />
        <Social isPartial />
        <Newsletter />
      </div>
      <Footer />
    </>
  );
}
