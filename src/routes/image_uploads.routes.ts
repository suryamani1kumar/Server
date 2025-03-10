import { Request, Response, Router } from "express";
import upload from "../middlewares/upload";

const router = Router();

router.post(
  "/upload",
  upload.array("files", 5),
  (req: Request, res: Response) => {
    if (!req.files) {
      res.status(400).json({ message: "No files uploaded!" });
    }

    res.status(200).json({
      message: "Files uploaded successfully!",
      files: req.files,
    });
  }
);

export default router;
