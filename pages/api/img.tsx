import type { NextApiRequest } from "next";
import mime from "mime";
import { join } from "path";
import formidable from "formidable";
import { mkdir, stat } from "fs/promises";

export const FormidableError = formidable.errors.FormidableError;

export const parseForm = async (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return new Promise(async (resolve, reject) => {
    const uploadDir = join(
      process.env.ROOT_DIR || process.cwd(),
      `/uploads/${Math.round(Math.random()*100)}`
    );

    try {
      await stat(uploadDir);
    } catch (e: any) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(e);
        reject(e);
        return;
      }
    }

    const form = formidable({
      maxFiles: 2,
      maxFileSize: 1024 * 1024, // 1mb
      uploadDir,
      filename: (_name, _ext, part) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${part.name || "unknown"}-${uniqueSuffix}.${
          mime.getExtension(part.mimetype || "") || "unknown"
        }`;
        return filename;
      },
      filter: (part) => {
        return (
          part.name === "media" && (part.mimetype?.includes("image") || false)
        );
      },
    });

    form.parse(req, function (err, fields, files) {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

// import { NextApiHandler, NextApiRequest } from "next";
// import { use } from "next-api-middleware";
// import formidable from "formidable";
// import CORSMiddleware from "@/middlewares/cors";
// import validMethods from "@/middlewares/validMethods.middleware";

// const parseForm = async (
//   req: NextApiRequest
// ): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
//   return new Promise(async (resolve, reject) => {
//     resolve({
//       files: {},
//       fields: {},
//     });
//     reject("wrong.");
//   });
// };


// const handler: NextApiHandler = async (
//   req: NextApiRequest
// ) => {
//   console.log(await parseForm(req));
// };

// export default use(CORSMiddleware, validMethods(["POST"]))(handler);