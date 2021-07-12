import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Social from "@/components/Social";

export default function SocialScreen(): JSX.Element {
  return (
    <>
      <Header />
      <div className="flex justify-center items-start mx-auto max-w-2xl">
        <Social />
      </div>
      <Footer />
    </>
  );
}
