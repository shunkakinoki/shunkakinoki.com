import { DefaultSeo } from "next-seo";
import Head from "next/head";
import type { FC } from "react";

export const Seo: FC = () => {
  return (
    <>
      <DefaultSeo
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
