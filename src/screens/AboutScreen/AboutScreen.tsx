import Header from "@/components/Header";
import Footer from "@/components/Footer";
import About from "@/components/About";

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
