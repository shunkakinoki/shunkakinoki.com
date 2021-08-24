import type { FC } from "react";

import { Container } from "@/common/Container";
import type { Props as BlogProps } from "@/components/Blog";
import { Blog } from "@/components/Blog";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Seo } from "@/components/Seo";

export type Props = BlogProps;

export const BlogScreen: FC<Props> = ({ database }) => {
  return (
    <>
      <Seo title="Blog" />
      <Header />
      <Container>
        <Blog database={database} />
      </Container>
      <Footer />
    </>
  );
};
