import { Buttondown, Github, Twitter } from "@/components/Dashboard/Analytics";
import { SectionText } from "@/common/Text";

export default function Dashboard(): JSX.Element {
  return (
    <section className="w-full mb-2">
      <div className="px-3 md:px-0">
        <SectionText>Dashboard</SectionText>
      </div>
      <dl className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2">
        <Buttondown />
        <Github />
        <Twitter />
      </dl>
    </section>
  );
}
