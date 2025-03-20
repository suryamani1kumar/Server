import { Router } from "express";
import { createBlog } from "../controllers/blog/createBlog.controller";
import { getBlog } from "../controllers/blog/blog.controller";
import { updateBlog } from "../controllers/blog/updateBlog.controller";
import { allBlog } from "../controllers/blog/allBlog.controller";
import { searchBlog } from "../controllers/blog/searchBlog.controller";

const router = Router();

router.post("/addBlog", createBlog);
router.get("/blog", getBlog);
router.get("/allBlog", allBlog);
router.get("/searchBlog", searchBlog);
router.post("/updateBlog", updateBlog);

export default router;
