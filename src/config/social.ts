import {
  DiscordLogoIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import {
  FaEthereum,
  FaFacebook,
  FaGitlab,
  FaKeybase,
  FaMedium,
  FaNpm,
  FaPatreon,
  FaPaypal,
  FaTelegram,
  FaTiktok,
  FaTwitch,
  FaWeixin,
  FaYoutube,
} from "react-icons/fa";

// -----------------------------------------------------------------------------
// Enum for URLs
// -----------------------------------------------------------------------------

export enum SocialConfig {
  Facebook = "https://www.facebook.com/shunkakinoki",
  Instagram = "https://www.instagram.com/shunkakinoki",
  X = "https://twitter.com/shunkakinoki",
  GitHub = "https://github.com/shunkakinoki",
  Discord = "https://discord.com/users/488389192775106561",
  Telegram = "https://t.me/shunkakinoki",
  LinkedIn = "https://www.linkedin.com/in/shunkakinoki",
  Ethereum = "https://etherscan.io/address/0x5f98805a4e8be1f0f8f1e4f5f7f4a1f4f3c6b9a6",
  Gitlab = "https://gitlab.com/shunkakinoki",
  Keybase = "https://keybase.io/shunkakinoki",
  Medium = "https://medium.com/@shunkakinoki",
  // biome-ignore lint/style/useNamingConvention: <explanation>
  NPM = "https://www.npmjs.com/~shunkakinoki",
  Patreon = "https://www.patreon.com/shunkakinoki",
  Paypal = "https://paypal.me/shunkakinoki",
  TikTok = "https://www.tiktok.com/@shunkakinoki",
  Typefully = "https://typefully.com/shunkakinoki",
  TypefullyStats = "https://typefully.com/shunkakinoki/stats",
  Twitch = "https://www.twitch.tv/shunkakinoki",
  WeChat = "https://u.wechat.com/IOTi43ThkZ9OEqC8IcYcmiQ",
  YouTube = "https://www.youtube.com/channel/UC34lMwRf8-TBAAnBczvYY2w",
}

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

export const socialConfig = [
  {
    name: "Facebook",
    href: SocialConfig.Facebook,
    icon: FaFacebook,
    isPriority: true,
  },
  {
    name: "Instagram",
    href: SocialConfig.Instagram,
    icon: InstagramLogoIcon,
    isPriority: true,
  },
  {
    name: "X",
    href: SocialConfig.X,
    icon: TwitterLogoIcon,
    isPriority: true,
  },
  {
    name: "GitHub",
    href: SocialConfig.GitHub,
    icon: GitHubLogoIcon,
    isPriority: true,
  },
  {
    name: "Discord",
    href: SocialConfig.Discord,
    icon: DiscordLogoIcon,
    isPriority: true,
  },
  {
    name: "Telegram",
    href: SocialConfig.Telegram,
    icon: FaTelegram,
    isPriority: true,
  },
  {
    name: "LinkedIn",
    href: SocialConfig.LinkedIn,
    icon: LinkedInLogoIcon,
    isPriority: false,
  },
  {
    name: "Ethereum",
    href: SocialConfig.Ethereum,
    icon: FaEthereum,
    isPriority: false,
  },
  {
    name: "Gitlab",
    href: SocialConfig.Gitlab,
    icon: FaGitlab,
    isPriority: false,
  },
  {
    name: "Keybase",
    href: SocialConfig.Keybase,
    icon: FaKeybase,
    isPriority: false,
  },
  {
    name: "Medium",
    href: SocialConfig.Medium,
    icon: FaMedium,
    isPriority: false,
  },
  {
    name: "NPM",
    href: SocialConfig.NPM,
    icon: FaNpm,
    isPriority: false,
  },
  {
    name: "Patreon",
    href: SocialConfig.Patreon,
    icon: FaPatreon,
    isPriority: false,
  },
  {
    name: "Paypal",
    href: SocialConfig.Paypal,
    icon: FaPaypal,
    isPriority: false,
  },
  {
    name: "TikTok",
    href: SocialConfig.TikTok,
    icon: FaTiktok,
    isPriority: false,
  },
  {
    name: "Twitch",
    href: SocialConfig.Twitch,
    icon: FaTwitch,
    isPriority: false,
  },
  {
    name: "WeChat",
    href: SocialConfig.WeChat,
    icon: FaWeixin,
    isPriority: false,
  },
  {
    name: "YouTube",
    href: SocialConfig.YouTube,
    icon: FaYoutube,
    isPriority: false,
  },
];

// -----------------------------------------------------------------------------
// Priority Const
// -----------------------------------------------------------------------------

export const socialPriorityConfig = socialConfig.filter(
  (item) => item.isPriority,
);
