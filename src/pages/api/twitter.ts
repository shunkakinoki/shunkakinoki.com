import { NextApiRequest, NextApiResponse } from "next";
import { SocialLinks } from "@/const";

export default async function twitter(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const userResponse = await fetch(
    `https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=${SocialLinks.shunkakinoki}`
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const user = await userResponse.json();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1800, stale-while-revalidate=600"
  );

  return res.status(200).json({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    followers: user[0]?.followers_count,
  });
}
