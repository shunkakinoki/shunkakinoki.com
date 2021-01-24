import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Social from "@/components/Social";

export default function SocialScreen(): JSX.Element {
  return (
    <>
      <Header />
      <div className="flex items-start justify-center max-w-2xl mx-auto">
        <Social />
      </div>
      <Footer />
    </>
  );
}
