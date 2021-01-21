import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LinkButton } from "@/common/Button";
import { ErrorText } from "@/common/Text";

export default function ErrorScreen(): JSX.Element {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center max-w-3xl mx-auto my-16 md:my-24 lg:my-32">
        <ErrorText>Error</ErrorText>
        <LinkButton href="/">Go home</LinkButton>
      </div>
      <Footer />
    </>
  );
}
