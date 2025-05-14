import { Router } from "express";
import { createBlog } from "../controllers/blog/createBlog.controller";
import { getBlog } from "../controllers/blog/blog.controller";
import {
  blogStatus,
  updateBlog,
} from "../controllers/blog/updateBlog.controller";
import { allBlog } from "../controllers/blog/allBlog.controller";
import { searchBlog } from "../controllers/blog/searchBlog.controller";
import { deleteBlog } from "../controllers/blog/deleteBlog.controller";
import upload from "../middlewares/upload";

const router = Router();

router.post("/addBlog", upload.array("files", 5), createBlog);
router.get("/blog", getBlog);
router.get("/allBlog", allBlog);
router.get("/blogs/search", searchBlog);
router.put("/updateBlog", updateBlog);
router.patch("/blogStatus", blogStatus);
router.delete("/deleteBlog", deleteBlog);

export default router;
