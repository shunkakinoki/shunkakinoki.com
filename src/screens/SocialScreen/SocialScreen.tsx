import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Social from "@/components/Social";

export default function SocialScreen(): JSX.Element {
  return (
    <>
      <Header />
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto">
        <Social />
      </div>
      <Footer />
    </>
  );
}
