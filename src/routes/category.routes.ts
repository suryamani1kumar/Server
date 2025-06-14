import { Router } from "express";
import { AddCategory } from "../controllers/category/addCategory.controller";
import { AddSubCategory } from "../controllers/category/addSubCategory.controller";
import upload from "../middlewares/upload";
import { getCategory, getCategoryById, searchCategory } from "../controllers/category/getCategory.controller";
import { ActiveCategory } from "../controllers/category/updateCategory.controller";


const router = Router();

router.post("/category", upload.array("file", 1), AddCategory);
router.post("/subcategory/:id", AddSubCategory);
router.get("/getcategory", getCategory);
router.get("/statusCategory/:id", ActiveCategory);
router.get("/categoryById/:id", getCategoryById);
router.get("/searchcategory", searchCategory);

export default router;
