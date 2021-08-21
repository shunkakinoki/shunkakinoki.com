import { DefaultSeo as Default } from "next-seo";
import Head from "next/head";
import type { FC } from "react";

export const image =
  "https://shunkakinoki.com/api/image?fileType=png&layoutName=Shun&Text=shunkakinoki";

export const DefaultSeo: FC = () => {
  return (
    <>
      <Default
        noindex={false}
        nofollow={false}
        title="Shun Kakinoki"
        canonical="https://shunkakinoki.com"
        description="Shun Kakinoki - Obliterate the Galaxy."
        openGraph={{
          locale: "en_US",
          site_name: "shunkakinoki.com",
          type: "website",
          url: "https://shunkakinoki.com",
          images: [{ url: image }],
        }}
        twitter={{
          cardType: "summary_large_image",
          handle: "@shunkakinoki",
          site: "@shunkakinoki",
        }}
      />
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
    </>
  );
};
