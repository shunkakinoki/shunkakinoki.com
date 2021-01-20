import SocialCard from "@/components/Social/SocialCard";
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
  Twitter,
  Wechat,
} from "@/icons";
import Link from "next/link";
import { SocialLinks } from "@/const";
import clsx from "clsx";

interface Props {
  isPartial?: boolean;
}

export default function Social({ isPartial = false }: Props): JSX.Element {
  return (
    <section className={clsx("w-full mb-6", isPartial && "mt-6")}>
      <div className="px-3 md:px-0">
        <h3 className="my-3 text-lg font-medium leading-loose text-gray-600 align-baseline md:text-xl dark:text-gray-300">
          Social Accounts
        </h3>
      </div>
      <div className="flex-col items-center w-full max-w-2xl px-3 mx-auto sm:px-2">
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
      {isPartial && (
        <div className="w-full pt-3 my-3 leading-5 text-center">
          <Link href="/social">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="mt-4 leading-5 text-center text-indigo-500 cursor-pointer dark:text-indigo-300 hover:underline">
              Show more...
            </a>
          </Link>
        </div>
      )}
    </section>
  );
}
