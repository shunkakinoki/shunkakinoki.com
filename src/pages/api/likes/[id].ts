import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

export const likes = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string;

    switch (req.method) {
      case "GET": {
        const [likes] = await Promise.all([
          prisma.likes.findUnique({
            where: { id },
          }),
        ]);

        res.json({
          likes: likes?.likes || 0,
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
};

export default likes;
