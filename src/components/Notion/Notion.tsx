/* eslint-disable react/display-name */

import { useTheme } from "next-themes";
import type { LinkProps } from "next/link";
import Link from "next/link";
import type { ExtendedRecordMap } from "notion-types";
import type { FC } from "react";
import { Collection, CollectionRow, NotionRenderer } from "react-notion-x";
import type { NotionRendererProps } from "react-notion-x/build/esm/renderer";
import "react-notion-x/src/styles.css";

export interface Props extends NotionRendererProps {
  recordMap: ExtendedRecordMap;
}

export const Notion: FC<Props> = ({ recordMap, fullPage }) => {
  const { theme } = useTheme();

  return (
    <NotionRenderer
      components={{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        collection: Collection,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        collectionRow: CollectionRow,
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
        }: LinkProps): JSX.Element => {
          return (
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
          );
        },
      }}
      fullPage={fullPage}
      recordMap={recordMap}
      darkMode={theme === "dark"}
      showCollectionViewDropdown={false}
      showTableOfContents={false}
    />
  );
};
