import type { NextApiRequest, NextApiResponse } from "next";

import { SocialLinks } from "@/const";

export const github = async (req: NextApiRequest, res: NextApiResponse) => {
  const userResponse = await fetch(
    `https://api.github.com/users/${SocialLinks.shunkakinoki}`,
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const user = await userResponse.json();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1800, stale-while-revalidate=600",
  );

  return res.status(200).json({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    followers: user?.followers,
  });
};

export default github;
