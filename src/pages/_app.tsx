/* eslint-disable react/jsx-props-no-spreading */

import { AppProps } from "next/app";

import "@/styles/index.css";

const CustomApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default CustomApp;
