import Cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";

import { runMiddleware } from "@/lib/runMiddleware";

const cors = Cors({
  methods: ["GET"],
});

export const subscribe = async (req: NextApiRequest, res: NextApiResponse) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    await runMiddleware(req, res, cors);

    const API_KEY = process.env.BUTTONDOWN_API_KEY;
    const response = await fetch(
      `https://api.buttondown.email/v1/subscribers`,
      {
        body: JSON.stringify({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          email,
          tags: ["newsletter"],
        }),
        headers: {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          Authorization: `Token ${API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      },
    );

    if (response.status >= 400) {
      const text = await response.text();

      if (text.includes("already subscribed")) {
        return res.status(400).json({
          error: "You're already subscribed to my mailing list.",
        });
      }

      return res.status(400).json({
        error: text,
      });
    }

    return res.status(201).json({ error: "" });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message || err.toString() });
    }
  }
};

export default subscribe;
