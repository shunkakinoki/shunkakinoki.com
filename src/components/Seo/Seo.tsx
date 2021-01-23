import { DefaultSeo } from "next-seo";

export default function Seo(): JSX.Element {
  return (
    <DefaultSeo
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
  );
}
