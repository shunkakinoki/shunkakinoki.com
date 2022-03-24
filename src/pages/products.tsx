import type { GetPageResponse } from "@notionhq/client/build/src/api-endpoints";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { queryDatabase } from "@/lib/notion";
import { ProductScreen } from "@/screens/ProductScreen";

export type Props = {
  database: GetPageResponse[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  if (!process.env.NOTION_PRODUCT_ID) {
    throw new Error("process.NOTION_PRODUCT_ID is not defined");
  }
  const dbResult = await queryDatabase({
    database_id: process.env.NOTION_PRODUCT_ID,
    sorts: [
      {
        property: "Name",
        direction: "ascending",
      },
    ],
  });
  const database = dbResult.results;
  if (database) {
    return {
      props: {
        database: database,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
};

export const Products = ({
  database,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  return <ProductScreen database={database} />;
};

export default Products;
