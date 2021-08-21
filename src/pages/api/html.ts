import Cors from "cors";
import type { NextApiHandler } from "next";

import { getHtml } from "@/lib/getHtml";
import { parseRequest } from "@/lib/parseRequest";
import { runMiddleware } from "@/lib/runMiddleware";

const cors = Cors({
  methods: ["GET"],
});

// eslint-disable-next-line @typescript-eslint/require-await
export const html: NextApiHandler = async (req, res) => {
  try {
    await runMiddleware(req, res, cors);
    const config = parseRequest(req);
    console.log(`\n--- /api/html ---\nCONFIG: ${JSON.stringify(config)}\n`);
    const html = getHtml(config);
    res.setHeader("Content-Type", "text/html");
    res.end(html);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
    console.error(e);
  }
};

export default html;
