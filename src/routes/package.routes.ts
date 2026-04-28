import { Router } from "express";
import {
  createPackage,
  deletePackageBySlug,
  getAllPackage,
  getPackageBySlug,
  getPackageBySlugWeb,
  updatePackage,
} from "../controllers/package/packagecontroller";

const router = Router();

router.post("/createPackage", createPackage);
router.put("/updatePackage", updatePackage);
router.get("/getAllPacakge", getAllPackage);
router.get("/getPackageBySlugWeb", getPackageBySlugWeb);
router.get("/getPackageBySlug", getPackageBySlug);
router.delete("/deletePackageBySlug", deletePackageBySlug);
// router.patch("/activePackageBySlug", isActivePackageBySlug);

export default router;
