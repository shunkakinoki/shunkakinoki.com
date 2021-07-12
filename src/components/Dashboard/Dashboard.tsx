import { SectionText } from "@/common/Text";
import { Buttondown, Github, Twitter } from "@/components/Dashboard/Analytics";

export default function Dashboard(): JSX.Element {
  return (
    <section className="mb-2 w-full">
      <div className="px-3 md:px-0">
        <SectionText>Dashboard</SectionText>
      </div>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
        <Buttondown />
        <Github />
        <Twitter />
      </dl>
    </section>
  );
}
