import Cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";
import { runMiddleware } from "@/lib/runMiddleware";

const cors = Cors({
  methods: ["GET", "POST"],
});

export const views = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await runMiddleware(req, res, cors);

    const id = req.query.id as string;

    switch (req.method) {
      case "GET": {
        const [views] = await Promise.all([
          prisma.views.findUnique({
            where: { id },
          }),
        ]);

        res.json({
          views: views?.views || 0,
        });
        return;
      }
      case "POST": {
        const [views] = await Promise.all([
          prisma.views.upsert({
            where: { id: id },
            create: {
              id: id,
              views: 1,
            },
            update: {
              views: {
                increment: 1,
              },
            },
          }),
        ]);

        res.json({
          views: views?.views || 0,
        });
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

export default views;
