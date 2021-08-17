import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import Script from "next/script";
import { RecoilRoot } from "recoil";

import "tailwindcss/tailwind.css";
import { Analytics } from "@/components/Analytics";
import { DefaultSeo } from "@/components/Seo";

const CustomApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "3fff5b53524d4928bae2c465c1ac14f2"}'
      />
      <Analytics />
      <DefaultSeo />
      <RecoilRoot>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
};

export default CustomApp;
