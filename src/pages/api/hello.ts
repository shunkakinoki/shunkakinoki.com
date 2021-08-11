import type { NextApiHandler } from "next";

export const hello: NextApiHandler = (req, res) => {
  console.log(req);
  res.json({ hello: "World" });
};

export default hello;
