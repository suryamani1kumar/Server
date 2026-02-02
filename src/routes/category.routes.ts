import { Router } from "express";
import upload from "../middlewares/upload";
import {
    ActiveCategory,
  AddCategory,
  deleteCategory,
  getCategory,
  getCategoryById,
  UpdateCategory,
} from "../controllers/category/category.controller";

const router = Router();

router.post("/category", upload.array("file", 1), AddCategory);
router.get("/getcategory", getCategory);
router.delete("/delete/:id", deleteCategory);
router.put("/updatecategory/:id", UpdateCategory);
router.patch("/statusCategory/:id", ActiveCategory);
router.get("/categoryById/:id", getCategoryById);

export default router;
