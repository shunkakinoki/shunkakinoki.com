import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Newsletter from "@/components/Newsletter";
import Notion, { Props as NotionProps } from "@/components/Notion";

export type Props = NotionProps;

export default function PageScreen({ recordMap, title }: Props): JSX.Element {
  return (
    <>
      <Header />
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto">
        <Notion recordMap={recordMap} title={title} />
        <Newsletter />
      </div>
      <Footer />
    </>
  );
}
