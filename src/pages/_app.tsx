import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";

import "@/styles/index.css";
import Seo from "@/components/Seo";

const CustomApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Seo />
      <ThemeProvider attribute="class" defaultTheme="system">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default CustomApp;
