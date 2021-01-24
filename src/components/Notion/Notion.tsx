import { useTheme } from "next-themes";
import { NotionRenderer, ExtendedRecordMap } from "react-notion-x";

import "react-notion-x/src/styles.css";
import { SectionText } from "@/common/Text";

export interface Props {
  recordMap: ExtendedRecordMap;
  title: string;
}

export default function Notion({ recordMap, title }: Props): JSX.Element {
  const { theme } = useTheme();

  return (
    <>
      <div className="px-3 md:px-0">
        <SectionText>{title}</SectionText>
      </div>
      <NotionRenderer
        recordMap={recordMap}
        darkMode={theme === "dark"}
        showCollectionViewDropdown={false}
        showTableOfContents={false}
      />
    </>
  );
}
