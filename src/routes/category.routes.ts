import { Router } from "express";
import { AddCategory } from "../controllers/category/addCategory.controller";
import { AddSubCategory } from "../controllers/category/addSubCategory.controller";
import {
  getCategory,
  getCategoryById,
} from "../controllers/category/getCategory.controller";
import upload from "../middlewares/upload";

const router = Router();

router.post("/category", upload.array("file", 1), AddCategory);
router.post("/subcategory/:id", AddSubCategory);
router.get("/getcategory", getCategory);
router.get("/categoryById/:id", getCategoryById);

export default router;
