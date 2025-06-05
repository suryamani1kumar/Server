import { Router } from "express";
import { trackingpixel } from "../controllers/tracking/trackingpixel.controller";

const router = Router();

router.post("/track", trackingpixel);

export default router;