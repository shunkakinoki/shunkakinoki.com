import {LinkButton} from "@/common/Button";
import {ErrorText} from "@/common/Text";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function NotFoundScreen(): JSX.Element {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center max-w-3xl mx-auto my-16 md:my-24 lg:my-32">
        <ErrorText>404</ErrorText>
        <LinkButton href="/">Go home</LinkButton>
      </div>
      <Footer />
    </>
  );
}
