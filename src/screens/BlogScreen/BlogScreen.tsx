import Blog, {Props as BlogProps} from "@/components/Blog";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export type Props = BlogProps;

export default function BlogScreen({frontMatter, source}: Props): JSX.Element {
  return (
    <>
      <Header />
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto">
        <Blog frontMatter={frontMatter} source={source} />
      </div>
      <Footer />
    </>
  );
}
