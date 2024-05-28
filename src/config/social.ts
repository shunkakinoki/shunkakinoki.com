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
// Const
// -----------------------------------------------------------------------------

export const socialConfig = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/shunkakinoki",
    icon: FaFacebook,
    isPriority: true,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/shunkakinoki",
    icon: InstagramLogoIcon,
    isPriority: true,
  },
  {
    name: "X",
    href: "https://twitter.com/shunkakinoki",
    icon: TwitterLogoIcon,
    isPriority: true,
  },
  {
    name: "GitHub",
    href: "https://github.com/shunkakinoki",
    icon: GitHubLogoIcon,
    isPriority: true,
  },
  {
    name: "Discord",
    href: "https://discord.com/users/488389192775106561",
    icon: DiscordLogoIcon,
    isPriority: true,
  },
  {
    name: "Telegram",
    href: "https://t.me/shunkakinoki",
    icon: FaTelegram,
    isPriority: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/shunkakinoki",
    icon: LinkedInLogoIcon,
    isPriority: false,
  },
  {
    name: "Ethereum",
    href: "https://etherscan.io/address/0x5f98805a4e8be1f0f8f1e4f5f7f4a1f4f3c6b9a6",
    icon: FaEthereum,
    isPriority: false,
  },
  {
    name: "Gitlab",
    href: "https://gitlab.com/shunkakinoki",
    icon: FaGitlab,
    isPriority: false,
  },
  {
    name: "Keybase",
    href: "https://keybase.io/shunkakinoki",
    icon: FaKeybase,
    isPriority: false,
  },
  {
    name: "Medium",
    href: "https://medium.com/@shunkakinoki",
    icon: FaMedium,
    isPriority: false,
  },
  {
    name: "NPM",
    href: "https://www.npmjs.com/~shunkakinoki",
    icon: FaNpm,
    isPriority: false,
  },
  {
    name: "Patreon",
    href: "https://www.patreon.com/shunkakinoki",
    icon: FaPatreon,
    isPriority: false,
  },
  {
    name: "Paypal",
    href: "https://paypal.me/shunkakinoki",
    icon: FaPaypal,
    isPriority: false,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@shunkakinoki",
    icon: FaTiktok,
    isPriority: false,
  },
  {
    name: "Twitch",
    href: "https://www.twitch.tv/shunkakinoki",
    icon: FaTwitch,
    isPriority: false,
  },
  {
    name: "WeChat",
    href: "https://u.wechat.com/IOTi43ThkZ9OEqC8IcYcmiQ",
    icon: FaWeixin,
    isPriority: false,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UC34lMwRf8-TBAAnBczvYY2w",
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
