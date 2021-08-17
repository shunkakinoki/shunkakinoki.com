/* eslint-disable @typescript-eslint/no-explicit-any */

import type Cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";

export const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (
    req: Cors.CorsRequest,
    res: {
      statusCode?: number | undefined;
      setHeader(key: string, value: string): any;
      end(): any;
    },
    next: (err?: any) => any,
  ) => void,
) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
};
