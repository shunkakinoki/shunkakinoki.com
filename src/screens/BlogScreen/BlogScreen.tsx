import Blog, { Props as BlogProps } from "@/components/Blog";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Life from "@/components/Life";

export type Props = BlogProps;

export default function BlogScreen({
  content,
  frontMatter,
}: Props): JSX.Element {
  return (
    <>
      <Header />
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto">
        <Blog content={content} frontMatter={frontMatter} />
        <Life />
      </div>
      <Footer />
    </>
  );
}
