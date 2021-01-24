import clsx from "clsx";

import { SwitchButton } from "@/common/Button";
import { SectionText } from "@/common/Text";
import SocialCard from "@/components/Social/SocialCard";
import { SocialLinks } from "@/const";
import {
  Bitcoin,
  Discord,
  Docker,
  Email,
  Facebook,
  Github,
  Gitlab,
  Instagram,
  Keybase,
  Line,
  Linkedin,
  Medium,
  Npm,
  Patreon,
  Paypal,
  Telegram,
  Tiktok,
  Twitch,
  Twitter,
  Wechat,
  Youtube,
} from "@/icons";

interface Props {
  isPartial?: boolean;
}

export default function Social({ isPartial = false }: Props): JSX.Element {
  return (
    <section key="social" className={clsx("w-full mb-6", isPartial && "mt-6")}>
      <div className="px-3 md:px-0">
        <SectionText isPartial={isPartial}>Social Accounts</SectionText>
      </div>
      <div className="flex-col items-center w-full px-6 mt-3 sm:px-4 md:px-0">
        <ul
          className={clsx(
            "grid w-full grid-cols-2 my-2 mt-4 gap-2 sm:grid-cols-3",
            isPartial && "md:gap-3",
            !isPartial && "md:gap-6"
          )}
        >
          <SocialCard
            isPriority
            href={SocialLinks.email}
            title="Email"
            username={SocialLinks.gmail}
          >
            <Email />
          </SocialCard>
          <SocialCard isPriority href={SocialLinks.facebook} title="Facebook">
            <Facebook />
          </SocialCard>
          <SocialCard isPriority href={SocialLinks.github} title="Github">
            <Github />
          </SocialCard>
          <SocialCard isPriority href={SocialLinks.linkedin} title="Linkedin">
            <Linkedin />
          </SocialCard>
          <SocialCard isPriority href={SocialLinks.instagram} title="Instagram">
            <Instagram />
          </SocialCard>
          <SocialCard isPriority href={SocialLinks.twitter} title="Twitter">
            <Twitter />
          </SocialCard>
          {!isPartial && (
            <>
              <SocialCard
                href={SocialLinks.bitcoin}
                title="Bitcoin"
                username={SocialLinks.crypto}
              >
                <Bitcoin />
              </SocialCard>
              <SocialCard href={SocialLinks.paypal} title="Paypal">
                <Paypal />
              </SocialCard>
              <SocialCard href={SocialLinks.keybase} title="Keybase">
                <Keybase />
              </SocialCard>
              <SocialCard href={SocialLinks.gitlab} title="Gitlab">
                <Gitlab />
              </SocialCard>
              <SocialCard href={SocialLinks.npm} title="Npm">
                <Npm />
              </SocialCard>
              <SocialCard href={SocialLinks.docker} title="Docker">
                <Docker />
              </SocialCard>
              <SocialCard href={SocialLinks.discord} title="Discord">
                <Discord />
              </SocialCard>
              <SocialCard href={SocialLinks.medium} title="Medium">
                <Medium />
              </SocialCard>
              <SocialCard href={SocialLinks.patreon} title="Patreon">
                <Patreon />
              </SocialCard>
              <SocialCard href={SocialLinks.tiktok} title="Tiktok">
                <Tiktok />
              </SocialCard>
              <SocialCard href={SocialLinks.twitch} title="Twitch">
                <Twitch />
              </SocialCard>
              <SocialCard href={SocialLinks.youtube} title="Youtube">
                <Youtube />
              </SocialCard>
              <SocialCard href={SocialLinks.line} title="Line">
                <Line />
              </SocialCard>
              <SocialCard href={SocialLinks.telegram} title="Telegram">
                <Telegram />
              </SocialCard>
              <SocialCard href={SocialLinks.wechat} title="Wechat">
                <Wechat />
              </SocialCard>
            </>
          )}
        </ul>
      </div>
      <div className="w-full pt-3 my-3 text-center leading-5">
        <div className="flex justify-center w-full">
          <SwitchButton
            href={isPartial ? "/social" : "/#social"}
            type={isPartial ? "right" : "left"}
          />
        </div>
      </div>
    </section>
  );
}
