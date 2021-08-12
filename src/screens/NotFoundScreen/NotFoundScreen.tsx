import type { FC } from "react";

import { LinkButton } from "@/common/Button";
import { ErrorText } from "@/common/Text";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Seo } from "@/components/Seo";

export const NotFoundScreen: FC = () => {
  return (
    <>
      <Seo />
      <Header />
      <div className="flex flex-col justify-center items-center my-16 md:my-24 lg:my-32 mx-auto max-w-3xl">
        <ErrorText>404</ErrorText>
        <LinkButton href="/">Go home</LinkButton>
      </div>
      <Footer />
    </>
  );
};
