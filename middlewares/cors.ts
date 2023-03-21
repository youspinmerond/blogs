import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

export default function CORSMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function=Cors({methods: ["POST", "PUT"]})
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}