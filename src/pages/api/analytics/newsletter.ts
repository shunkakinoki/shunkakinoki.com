import Cors from "cors";

import type { NextApiRequest, NextApiResponse } from "next";

import { runMiddleware } from "@/lib/runMiddleware";

const cors = Cors({
  methods: ["GET"],
});

export const newsletter = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors);

  const result = await fetch("https://www.getrevue.co/api/v2/subscribers", {
    method: "GET",
    headers: {
      Authorization: `Token ${process.env.REVUE_API_KEY}`,
    },
  });
  const data = await result.json();

  if (!result.ok) {
    return res.status(500).json({ error: "Error retrieving subscribers" });
  }

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1200, stale-while-revalidate=600",
  );

  return res.status(200).json({ number: data.length });
};

export default newsletter;
