import { SectionText } from "@/common/Text";
import { Buttondown, Github, Twitter } from "@/components/Dashboard/Analytics";

export default function Dashboard(): JSX.Element {
  return (
    <section className="w-full mb-2">
      <div className="px-3 md:px-0">
        <SectionText>Dashboard</SectionText>
      </div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Buttondown />
        <Github />
        <Twitter />
      </dl>
    </section>
  );
}
