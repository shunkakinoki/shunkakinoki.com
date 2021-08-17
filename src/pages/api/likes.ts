import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const id = req.query.id as string;

    switch (req.method) {
      case "GET": {
        const [post, user] = await Promise.all([
          // get the number of times the current user has liked this post
          prisma.likes.findUnique({
            where: { id },
          }),
        ]);

        res.json({
          totalPostLikes: post?.likes || 0,
          currentUserLikes: user?.likes || 0,
        });
        return;
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);

      res.status(500).json({
        statusCode: 500,
        message: err.message,
      });
    }
  }
}
