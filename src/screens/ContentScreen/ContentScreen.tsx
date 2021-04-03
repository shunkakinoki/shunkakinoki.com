import type { Props as ContentProps } from "@/components/Content";
import Content from "@/components/Content";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export type Props = ContentProps;

export default function ContentScreen({
  frontMatter,
  source,
}: Props): JSX.Element {
  return (
    <>
      <Header />
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto">
        <Content frontMatter={frontMatter} source={source} />
      </div>
      <Footer />
    </>
  );
}
