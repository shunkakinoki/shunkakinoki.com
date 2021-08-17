import Cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";

import { SocialLinks } from "@/const";
import { runMiddleware } from "@/lib/runMiddleware";

const cors = Cors({
  methods: ["GET"],
});

export const twitter = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors);

  const userResponse = await fetch(
    `https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=${SocialLinks.shunkakinoki}`,
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const user = await userResponse.json();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1800, stale-while-revalidate=600",
  );

  return res.status(200).json({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    number: user[0]?.followers_count,
  });
};

export default twitter;
