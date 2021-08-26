import { CryptoLinks } from "./CryptoLinks";
import { shunkakinoki } from "./shunkakinoki";

export class SocialLinks {
  static readonly gmail = `${shunkakinoki}@gmail.com`;

  static readonly email = `mailto:${SocialLinks.gmail}`;
  static readonly pioneer = "https://pioneer.app/winners/shun-kakinoki/";
  static readonly website = `https://${shunkakinoki}.com`;

  static readonly discord = `https://discord.com/users/${shunkakinoki}`;
  static readonly docker = `https://hub.docker.com/u/${shunkakinoki}`;
  static readonly ethereum = `https://etherscan.io/address/${CryptoLinks.ethereum}`;
  static readonly facebook = `https://facebook.com/${shunkakinoki}`;
  static readonly github = `https://github.com/${shunkakinoki}`;
  static readonly gitlab = `https://gitlab.com/${shunkakinoki}`;
  static readonly instagram = `https://instagram.com/${shunkakinoki}`;
  static readonly keybase = `https://keybase.io/${shunkakinoki}`;
  static readonly line = "https://line.me/ti/p/jxc0rpPhBv";
  static readonly linkedin = `https://linkedin.com/in/${shunkakinoki}`;
  static readonly medium = `https://medium.com/@${shunkakinoki}`;
  static readonly npm = `https://npmjs.com/~${shunkakinoki}`;
  static readonly patreon = `https://patreon.com/${shunkakinoki}`;
  static readonly paypal = `https://paypal.me/${shunkakinoki}`;
  static readonly telegram = `https://t.me/${shunkakinoki}`;
  static readonly tiktok = `https://tiktok.com/@${shunkakinoki}`;
  static readonly twitch = `https://twitch.tv/${shunkakinoki}`;
  static readonly twitter = `https://twitter.com/${shunkakinoki}`;
  static readonly wechat = "https://u.wechat.com/IOTi43ThkZ9OEqC8IcYcmiQ";
  static readonly youtube =
    "https://www.youtube.com/channel/UC34lMwRf8-TBAAnBczvYY2w";

  static readonly eth = this.ethereum;
}
