import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import "tailwindcss/tailwind.css";
import { DefaultSeo } from "@/components/Seo";

const CustomApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <DefaultSeo />
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
};

export default CustomApp;
