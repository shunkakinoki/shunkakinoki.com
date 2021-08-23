import type { NextSeoProps } from "next-seo";
import { NextSeo } from "next-seo";
import type { FC } from "react";

export interface Props extends NextSeoProps {
  title?: string;
  description?: string;
  date?: string;
}

export const Seo: FC<Props> = ({ date, title, description, ...rest }) => {
  const imageUrl =
    date && title
      ? `https://shunkakinoki.com/api/image?fileType=png&layoutName=Blog&Theme=Dark&Title=${title?.replace(
          /\s/g,
          "+",
        )}&Date=${date?.replace(/\s/g, "+").replace(/\\/g, "%2F")}`
      : title
      ? `https://shunkakinoki.com/api/image?fileType=png&layoutName=Website&Theme=Dark&Title=${title?.replace(
          /\s/g,
          "+",
        )}`
      : "https://shunkakinoki.com/api/image?fileType=png&layoutName=Shun&Title=shunkakinoki";

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          images: [{ url: imageUrl }],
        }}
        {...rest}
      />
    </>
  );
};
