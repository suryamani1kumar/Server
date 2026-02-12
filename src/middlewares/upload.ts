import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { config } from "../config/config";

const storage = multer.memoryStorage();

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  const allowedTypes = ["image/webp", "image/png", "image/jpeg"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG and WEBP images are allowed"));
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 }, // 500KB
  fileFilter,
});

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

export { cloudinary };

export const uploadBufferToCloudinary = (
  buffer: Buffer,
  folder: string,
  resourceType: "image" | "raw" | "video" = "image",
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder, resource_type: resourceType },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error("Upload failed"));
          resolve(result);
        },
      )
      .end(buffer);
  });
};
