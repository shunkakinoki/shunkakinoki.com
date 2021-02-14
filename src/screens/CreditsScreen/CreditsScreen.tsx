import Credits, { Props as CreditsProps } from "@/components/Credits";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export type Props = CreditsProps;

export default function CreditsScreen({
  frontMatter,
  source,
}: Props): JSX.Element {
  return (
    <>
      <Header />
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto">
        <Credits frontMatter={frontMatter} source={source} />
      </div>
      <Footer />
    </>
  );
}
