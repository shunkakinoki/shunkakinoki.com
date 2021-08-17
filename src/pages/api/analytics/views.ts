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

    switch (req.method) {
      case "GET": {
        const [views] = await Promise.all([
          prisma.views.aggregate({
            _sum: {
              views: true,
            },
          }),
        ]);

        return res.status(200).json({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          number: views._sum.views || 0,
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
