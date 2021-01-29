/* eslint-disable react/display-name */

import { useTheme } from "next-themes";
import Link, { LinkProps } from "next/link";
import { ExtendedRecordMap } from "notion-types";
import { Collection, NotionRenderer } from "react-notion-x";
import { NotionRendererProps } from "react-notion-x/build/esm/renderer";
import "react-notion-x/src/styles.css";

export interface Props extends NotionRendererProps {
  recordMap: ExtendedRecordMap;
}

export default function Notion({ recordMap, fullPage }: Props): JSX.Element {
  const { theme } = useTheme();

  return (
    <NotionRenderer
      components={{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        collection: Collection,
        pageLink: ({
          href,
          as,
          passHref,
          prefetch,
          replace,
          scroll,
          shallow,
          locale,
          ...props
        }: LinkProps): JSX.Element => (
          <Link
            href={href}
            as={as}
            passHref={passHref}
            prefetch={prefetch}
            replace={replace}
            scroll={scroll}
            shallow={shallow}
            locale={locale}
          >
            {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
            <a {...props} />
          </Link>
        ),
      }}
      fullPage={fullPage}
      recordMap={recordMap}
      darkMode={theme === "dark"}
      showCollectionViewDropdown={false}
      showTableOfContents={false}
    />
  );
}
