import { Router } from "express";
import { trackingpixel } from "../controllers/tracking/trackingpixel.controller";

const router = Router();

router.get("/track", trackingpixel);

export default router;