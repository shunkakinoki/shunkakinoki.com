import About from "@/components/About";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function AboutScreen(): JSX.Element {
  return (
    <>
      <Header />
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto">
        <About />
      </div>
      <Footer />
    </>
  );
}
