import { Router } from "express";
import {
  createPackage,
  deletePackageBySlug,
  getAllPackage,
  getPackageBySlug,
  getPackageBySlugWeb,
  updatePackage,
} from "../controllers/package/packagecontroller";
import { createPackageCatgory, getPackageCatgory, updatePackageCategory } from "../controllers/package/pkgcategorycontroller";

const router = Router();
router.post("/package/createPackageCatgory", createPackageCatgory);
router.put("/package/updatePkgCategory", updatePackageCategory);
router.get("/package/packageCatgory", getPackageCatgory);
router.post("/package/createPackage", createPackage);
router.put("/package/updatePackage", updatePackage);
router.get("/package/getAllPacakge", getAllPackage);
router.get("/package/getPackageBySlugWeb", getPackageBySlugWeb);
router.get("/package/getPackageBySlug", getPackageBySlug);
router.delete("/package/deletePackageBySlug", deletePackageBySlug);
// router.patch("/package/activePackageBySlug", isActivePackageBySlug);

export default router;
