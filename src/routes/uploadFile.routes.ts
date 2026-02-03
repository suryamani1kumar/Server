import { Router } from "express";
import { deleteUploadFile, uploadFile } from "../controllers/uploadfile/uploadfile.controller";
import { upload } from "../middlewares/upload";

const router = Router();

router.post("/upload", upload.single("file"), uploadFile);
router.delete("/fileDelete", deleteUploadFile);

export default router;
