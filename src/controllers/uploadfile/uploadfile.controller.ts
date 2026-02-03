import { Request, Response } from "express";
import { cloudinary, uploadBufferToCloudinary } from "../../middlewares/upload";

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const isPDF = req.file.mimetype === "application/pdf";

    const result = await uploadBufferToCloudinary(
      req.file.buffer,
      "images",
      isPDF ? "raw" : "image",
    );

    res.status(200).json({
      message: "Upload successful",
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteUploadFile = async (req: Request, res: Response) => {
  try {
    const { public_id, resource_type } = req.body;

    if (!public_id) {
      res.status(400).json({ message: "public_id is required" });
      return;
    }

    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type: resource_type || "image",
    });

    res.status(200).json({
      message: "Delete result",
      cloudinary_response: result,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
