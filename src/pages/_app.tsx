import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import Script from "next/script";
import { RecoilRoot } from "recoil";

import "tailwindcss/tailwind.css";
import { Default } from "@/components/Seo";

const CustomApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "aadfc302c28748169bacfd73215ca576"}'
      />
      <Default />
      <RecoilRoot>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
};

export default CustomApp;
