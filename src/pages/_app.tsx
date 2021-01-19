import { AppProps } from "next/app";

import "@/styles/index.css";
import { ThemeProvider } from "next-themes";

const CustomApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default CustomApp;
