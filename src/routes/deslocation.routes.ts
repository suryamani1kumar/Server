import { Router } from "express";
import {
  createLocation,
  getLocation,
  getLocationsByType,
} from "../controllers/destination/location.controller";
import {
  createDestination,
  deleteDestination,
  destinationStatus,
  getAllDestinations,
  getDestinationBySlug,
  updateDestination,
} from "../controllers/destination/destination.controller";

const router = Router();

router.post("/addlocation", createLocation);
router.get("/getlocation", getLocation);
router.get("/getLocationsByType",getLocationsByType)
router.post("/adddestination", createDestination);
router.put("/updatedestination", updateDestination);
router.get("/getdestination", getAllDestinations);
router.get("/slugdestination", getDestinationBySlug);
router.delete("/deleteDes", deleteDestination);
router.patch("/destinationStatus", destinationStatus);

export default router;
