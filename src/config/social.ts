import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { FaEthereum, FaFacebook } from "react-icons/fa";

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

export const socialConfig = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/shunkakinoki",
    icon: InstagramLogoIcon,
    isPriority: true,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/shunkakinoki",
    icon: FaFacebook,
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
];

// -----------------------------------------------------------------------------
// Priority Const
// -----------------------------------------------------------------------------

export const socialPriorityConfig = socialConfig.filter(
  (item) => item.isPriority,
);
