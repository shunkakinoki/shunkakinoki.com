import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import "tailwindcss/tailwind.css";
import { Default } from "@/components/Seo";

const CustomApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
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
