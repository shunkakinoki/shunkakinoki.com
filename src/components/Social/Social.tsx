import SocialCard from "@/components/Social/SocialCard";
import {
  Email,
  Facebook,
  Github,
  Instagram,
  Medium,
  Twitter,
} from "@/icons/Social";
import { SocialLinks } from "@/const";

export default function Social(): JSX.Element {
  return (
    <section className="my-6">
      <div className="px-3 md:px-0">
        <h3 className="my-3 text-lg font-medium leading-loose text-gray-600 align-baseline md:text-xl dark:text-gray-400">
          Social Accounts
        </h3>
      </div>
      <div className="flex-col items-center w-full max-w-xl px-3 mx-auto">
        <ul className="grid w-full grid-cols-2 gap-4 my-2 mt-4 md:gap-6 sm:grid-cols-3">
          <SocialCard
            href={SocialLinks.email}
            title="Email"
            username={SocialLinks.gmail}
          >
            <Email />
          </SocialCard>
          <SocialCard href={SocialLinks.facebook} title="Facebook">
            <Facebook />
          </SocialCard>
          <SocialCard href={SocialLinks.github} title="Github">
            <Github />
          </SocialCard>
          <SocialCard href={SocialLinks.medium} title="Medium">
            <Medium />
          </SocialCard>
          <SocialCard href={SocialLinks.instagram} title="Instagram">
            <Instagram />
          </SocialCard>
          <SocialCard href={SocialLinks.twitter} title="Twitter">
            <Twitter />
          </SocialCard>
        </ul>
      </div>
    </section>
  );
}