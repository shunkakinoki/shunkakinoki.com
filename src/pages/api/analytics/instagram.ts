import Cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";

import { SocialLinks } from "@/const";
import { runMiddleware } from "@/lib/runMiddleware";

const cors = Cors({
  methods: ["GET"],
});

export const instagram = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors);

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
    number: user.graphql?.user?.edge_followed_by?.count,
  });
};

export default instagram;
