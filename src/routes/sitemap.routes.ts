import { Router } from "express";
import { getSitemapUrl } from "../controllers/sitemap/sitemap.controller";

const router = Router();

router.get("/sitemap", getSitemapUrl);

export default router;
