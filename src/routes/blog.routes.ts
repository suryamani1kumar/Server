import { Router } from "express";
import { createBlog } from "../controllers/blog/createBlog.controller";
import { getBlog } from "../controllers/blog/blog.controller";
import { updateBlog } from "../controllers/blog/updateBlog.controller";

const router = Router();

router.post("/addBlog", createBlog);
router.get("/blog", getBlog);
router.post("/updateBlog", updateBlog);

export default router;
