import { Router } from "express";
import {
  createLocation,
  getCity,
  getCountry,
  getLocation,
} from "../controllers/destination/location.controller";
import {
  createDestination,
  deleteDestination,
  getAllDestinations,
  getDestinationBySlug,
  updateDestination,
} from "../controllers/destination/destination.controller";

const router = Router();

router.post("/addlocation", createLocation);
router.get("/getlocation", getLocation);
router.get("/getCountry", getCountry);
router.get("/getCity", getCity);
router.post("/adddestination", createDestination);
router.put("/updatedestination", updateDestination);
router.get("/getdestination", getAllDestinations);
router.get("/slugdestination", getDestinationBySlug);
router.delete("/deleteDes", deleteDestination);

export default router;
