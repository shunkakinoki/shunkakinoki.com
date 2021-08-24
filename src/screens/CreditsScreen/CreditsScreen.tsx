import type { FC } from "react";

import { Container } from "@/common/Container";
import type { Props as CreditsProps } from "@/components/Credits";
import { Credits } from "@/components/Credits";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Seo } from "@/components/Seo";

export type Props = CreditsProps;

export const CreditsScreen: FC<Props> = ({ source }) => {
  return (
    <>
      <Seo title="Credits" />
      <Header />
      <Container>
        <Credits source={source} />
      </Container>
      <Footer />
    </>
  );
};
