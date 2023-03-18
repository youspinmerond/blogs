import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
// import formidable from "formidable";
// import { join } from "path";
// import mime from "mime";

// const uploadDir = join(
//   process.env.ROOT_DIR || process.cwd(),
//   `/uploads/${Date.now().toString()}`
// );

// const form = formidable({
//   maxFiles: 2,
//   maxFileSize: 1024 * 1024, // 1mb
//   uploadDir,
//   filename: (_name, _ext, part) => {
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     const filename = `${part.name || "unknown"}-${uniqueSuffix}.${
//       mime.getExtension(part.mimetype || "") || "unknown"
//     }`;
//     return filename;
//   },
//   filter: (part) => {
//     return (
//       part.name === "media" && (part.mimetype?.includes("image") || false)
//     );
//   },
// });

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// }

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json("Youre lost. Go back.");
};

export default handler;