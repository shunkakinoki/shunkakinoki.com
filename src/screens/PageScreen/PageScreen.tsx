import { useTheme } from "next-themes";
import { NotionRenderer, ExtendedRecordMap } from "react-notion-x";

import "react-notion-x/src/styles.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Newsletter from "@/components/Newsletter";

interface Props {
  recordMap: ExtendedRecordMap;
}

export default function PageScreen({ recordMap }: Props): JSX.Element {
  const { theme } = useTheme();

  return (
    <>
      <Header />
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto">
        <NotionRenderer
          fullPage
          recordMap={recordMap}
          darkMode={theme === "dark"}
        />
        <Newsletter />
      </div>
      <Footer />
    </>
  );
}
