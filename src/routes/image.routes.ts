import { Router } from "express";
import upload from "../middlewares/upload";
import { uploadImage } from "../controllers/image/image.controller";

const router = Router();

router.post("/upload", upload.array("files", 5), uploadImage);

export default router;
