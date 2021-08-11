import type { NextApiRequest, NextApiResponse } from "next";

export const buttondown = async (req: NextApiRequest, res: NextApiResponse) => {
  const API_KEY = process.env.BUTTONDOWN_API_KEY;
  const newsletterResponse = await fetch(
    "https://api.buttondown.email/v1/subscribers",
    {
      headers: {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        Authorization: `Token ${API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newsletter = await newsletterResponse.json();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1800, stale-while-revalidate=600",
  );

  return res.status(200).json({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    subscribers: newsletter?.count,
  });
};
