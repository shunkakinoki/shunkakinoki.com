import type { NextApiRequest, NextApiResponse } from "next";

export const subscribe = (req: NextApiRequest, res: NextApiResponse) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
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
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    return res.status(500).json({ error: error.message || error.toString() });
  }
};
