import type { Props as BlogProps } from "@/components/Blog";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export type Props = BlogProps;

export default function BlogScreen({
  frontMatter,
  source,
  slug,
}: Props): JSX.Element {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-start mx-auto max-w-2xl">
        <Blog frontMatter={frontMatter} source={source} slug={slug} />
      </div>
      <Footer />
    </>
  );
}
