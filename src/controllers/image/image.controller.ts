import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import { config } from "../../config/config";

export const uploadImage = async (
  req: Request,
  res: Response
): Promise<any> => {
  const files = req.files;

  if (!files?.length) {
    return res.status(400).json({ message: "No files uploaded!" });
  }

  const imageUrl = (files as Array<Express.Multer.File>).map(
    (file) => `${config.SERVER_URL}/image/${file?.filename}`
  );

  res.status(200).json({
    message: "Upload successful",
    url: imageUrl,
  });
};

export const getImage = async (req: Request, res: Response): Promise<any> => {
  const { filename } = req.params;

  const width: number = parseInt(req.query.w as string);

  const imagePath = path.join(process.cwd(), "public", filename);

  if (!fs.existsSync(imagePath)) {
    return res.status(404).send("Image not found");
  }

  try {
    let image = sharp(imagePath);

    if (!isNaN(width)) {
      image = image.resize({
        width: isNaN(width) ? undefined : width,
        fit: "inside", // or 'cover', 'fill', etc.
      });
    }

    const buffer = await image.toBuffer();
    res.set("Content-Type", "image/webp");
    res.send(buffer);
  } catch (err) {
    res.status(500).send(err);
  }
};
