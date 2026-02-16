import { Request, Response } from "express";
import { cloudinary, uploadBufferToCloudinary } from "../../middlewares/upload";
import { fileSave } from "../../models/media.schema";

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

export const AddFile = async (req: Request, res: Response) => {
  try {
    const { url, public_id } = req.body;

    if (!url || !public_id) {
      res.status(400).json({ message: "url and public_id are required" });
      return;
    }

    const file = new fileSave({
      url,
      public_id,
    });

    const savedData = await file.save();

    res
      .status(201)
      .json({ message: "file Save successfully", data: savedData });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to Save file",
      error: error.message || error,
    });
  }
};

export const GetAllFile = async (req: Request, res: Response) => {
  try {
    const getfile = await fileSave.find();

    res.status(200).json({
      message: "file fetched successfully",
      data: getfile,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message || error,
    });
  }
};

export const deleteFile = async (req: Request, res: Response) => {
  try {
    const { public_id } = req.query;

    await fileSave.findOneAndDelete({public_id });

    res.status(200).json({
      message: "file Delete successfully",
    });

  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message || error,
    });
  }
};
