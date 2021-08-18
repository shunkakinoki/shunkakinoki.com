import type { NextApiHandler } from "next";

// eslint-disable-next-line @typescript-eslint/require-await
export const hello: NextApiHandler = async (req, res) => {
  console.log(req);
  res.json({ hello: "World" });
};

export default hello;
