import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";

export default function BlogScreen(): JSX.Element {
  return (
    <>
      <Header />
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto">
        <Newsletter />
      </div>
      <Footer />
    </>
  );
}
