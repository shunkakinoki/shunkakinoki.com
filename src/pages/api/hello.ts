import Cors from "cors";
import type { NextApiHandler } from "next";

import { runMiddleware } from "@/lib/runMiddleware";

const cors = Cors({
  methods: ["GET"],
});

export const hello: NextApiHandler = async (req, res) => {
  await runMiddleware(req, res, cors);
  console.log(req);
  res.json({ hello: "World" });
};

export default hello;
