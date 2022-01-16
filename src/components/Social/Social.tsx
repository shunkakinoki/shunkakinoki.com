import clsx from "clsx";

import type { FC } from "react";

import {
  FaDiscord,
  FaDocker,
  FaEnvelope,
  FaEthereum,
  FaFacebook,
  FaGithub,
  FaGitlab,
  FaInstagram,
  FaKeybase,
  FaLine,
  FaLinkedin,
  FaMedium,
  FaNpm,
  FaPatreon,
  FaPaypal,
  FaTelegram,
  FaTwitch,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { SiTiktok, SiWechat } from "react-icons/si";

import { SwitchButton } from "@/common/Button";
import { SectionText } from "@/common/Text";
import { SocialCard } from "@/components/Social/SocialCard";
import { CryptoLinks, SocialLinks } from "@/const";

export interface Props {
  isPartial?: boolean;
}

export const Social: FC<Props> = ({ isPartial = false }) => {
  return (
    <section key="social" className={clsx("mb-6 w-full", isPartial && "mt-6")}>
      <div className="px-3 md:px-0">
        <SectionText isPartial={isPartial}>Social Accounts</SectionText>
      </div>
      <div className="flex-col items-center px-6 mt-3 w-full sm:px-4 md:px-0">
        <ul
          className={clsx(
            "grid grid-cols-2 gap-2 my-2 mt-4 w-full sm:grid-cols-3",
            isPartial && "md:gap-3",
            !isPartial && "md:gap-6",
          )}
        >
          <SocialCard
            isPriority
            href={SocialLinks.email}
            title="Email"
            username={SocialLinks.gmail}
          >
            <FaEnvelope className="w-6 h-6" />
          </SocialCard>
          <SocialCard isPriority href={SocialLinks.facebook} title="Facebook">
            <FaFacebook className="w-6 h-6" />
          </SocialCard>
          <SocialCard isPriority href={SocialLinks.github} title="Github">
            <FaGithub className="w-6 h-6" />
          </SocialCard>
          <SocialCard isPriority href={SocialLinks.linkedin} title="Linkedin">
            <FaLinkedin className="w-6 h-6" />
          </SocialCard>
          <SocialCard isPriority href={SocialLinks.instagram} title="Instagram">
            <FaInstagram className="w-6 h-6" />
          </SocialCard>
          <SocialCard isPriority href={SocialLinks.twitter} title="Twitter">
            <FaTwitter className="w-6 h-6" />
          </SocialCard>
          {!isPartial && (
            <>
              <SocialCard
                href={SocialLinks.ethereum}
                title="Ethereum"
                username={CryptoLinks.ens}
              >
                <FaEthereum className="w-6 h-6" />
              </SocialCard>
              <SocialCard href={SocialLinks.paypal} title="Paypal">
                <FaPaypal className="w-6 h-6" />
              </SocialCard>
              <SocialCard href={SocialLinks.keybase} title="Keybase">
                <FaKeybase className="w-6 h-6" />
              </SocialCard>
              <SocialCard href={SocialLinks.gitlab} title="Gitlab">
                <FaGitlab className="w-6 h-6" />
              </SocialCard>
              <SocialCard href={SocialLinks.npm} title="Npm">
                <FaNpm className="w-6 h-6" />
              </SocialCard>
              <SocialCard href={SocialLinks.docker} title="Docker">
                <FaDocker className="w-6 h-6" />
              </SocialCard>
              <SocialCard
                href={SocialLinks.discord}
                username={SocialLinks.discordName}
                title="Discord"
              >
                <FaDiscord className="w-6 h-6" />
              </SocialCard>
              <SocialCard href={SocialLinks.medium} title="Medium">
                <FaMedium className="w-6 h-6" />
              </SocialCard>
              <SocialCard href={SocialLinks.patreon} title="Patreon">
                <FaPatreon className="w-6 h-6" />
              </SocialCard>
              <SocialCard href={SocialLinks.tiktok} title="Tiktok">
                <SiTiktok className="w-6 h-6" />
              </SocialCard>
              <SocialCard href={SocialLinks.twitch} title="Twitch">
                <FaTwitch className="w-6 h-6" />
              </SocialCard>
              <SocialCard href={SocialLinks.youtube} title="Youtube">
                <FaYoutube className="w-6 h-6" />
              </SocialCard>
              <SocialCard href={SocialLinks.line} title="Line">
                <FaLine className="w-6 h-6" />
              </SocialCard>
              <SocialCard href={SocialLinks.telegram} title="Telegram">
                <FaTelegram className="w-6 h-6" />
              </SocialCard>
              <SocialCard href={SocialLinks.wechat} title="Wechat">
                <SiWechat className="w-6 h-6" />
              </SocialCard>
            </>
          )}
        </ul>
      </div>
      <div className="pt-3 my-3 w-full leading-5 text-center">
        <div className="flex justify-center w-full">
          <SwitchButton
            href={isPartial ? "/social" : "/#social"}
            type={isPartial ? "right" : "left"}
          />
        </div>
      </div>
    </section>
  );
};
