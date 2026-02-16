import { Router } from "express";
import {
  AddFile,
  deleteFile,
  deleteUploadFile,
  GetAllFile,
  uploadFile,
} from "../controllers/uploadfile/uploadfile.controller";
import { upload } from "../middlewares/upload";

const router = Router();

router.post("/upload", upload.single("file"), uploadFile);
router.delete("/fileDelete", deleteUploadFile);
router.post("/saveFile", AddFile);
router.get("/getFile", GetAllFile);
router.delete("/deleteFile", deleteFile);

export default router;
