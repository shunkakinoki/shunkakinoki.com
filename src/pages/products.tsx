import type { Page } from "@notionhq/client/build/src/api-types";
import type { InferGetStaticPropsType, GetStaticProps } from "next";

import { queryDatabase } from "@/lib/notion";
import { ProductScreen } from "@/screens/ProductScreen";

export type Props = {
  database: Page[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  if (!process.env.NOTION_PRODUCT_ID) {
    throw new Error("process.NOTION_PRODUCT_ID is not defined");
  }
  const dbResult = await queryDatabase(
    process.env.NOTION_PRODUCT_ID,
    undefined,
    [
      {
        property: "Name",
        direction: "ascending",
      },
    ],
  );
  const database = dbResult.results;
  if (database) {
    return {
      props: {
        database: database,
      },
      revalidate: 30,
    };
  } else {
    return {
      notFound: true,
      revalidate: 30,
    };
  }
};

export const Products = ({
  database,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return <ProductScreen database={database} />;
};

export default Products;
