import type { NextSeoProps } from "next-seo";
import { NextSeo } from "next-seo";
import type { FC } from "react";

export interface Props extends NextSeoProps {
  title?: string;
  description?: string;
  date?: string;
}

export const Seo: FC<Props> = ({ date, title, description, ...rest }) => {
  const uriDate = date?.replaceAll(" ", "%20");
  const uriTitle = title?.replaceAll(" ", "%20");
  const imageUrl =
    date && title
      ? `https://shunkakinoki.com/api/image?fileType=png&layoutName=Blog&Theme=Dark&Title=${uriTitle}&Date=${uriDate}`
      : title
      ? `https://shunkakinoki.com/api/image?fileType=png&layoutName=Website&Theme=Dark&Title=${uriTitle}`
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
