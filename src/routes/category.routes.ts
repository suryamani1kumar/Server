import { Router } from "express";
import { AddCategory } from "../controllers/category/addCategory.controller";
import { AddSubCategory } from "../controllers/category/addSubCategory.controller";

const router = Router();

router.post("/category", AddCategory);
router.post("/subcategory/:id", AddSubCategory);

export default router;
