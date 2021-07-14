import type { NextApiRequest, NextApiResponse } from "next";

import { SocialLinks } from "@/const";

export default async function instagram(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const userResponse = await fetch(
    `https://www.instagram.com/${SocialLinks.shunkakinoki}/channel/?__a=1`,
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const user = await userResponse.json();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1800, stale-while-revalidate=600",
  );

  return res.status(200).json({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    followers: user.graphql?.user?.edge_followed_by?.count,
  });
}
