import { Router } from "express";
import {
  createLocation,
  getLocation,
} from "../controllers/destination/location.controller";
import {
  createDestination,
  getAllDestinations,
  updateDestination,
} from "../controllers/destination/destination.controller";

const router = Router();

router.post("/addlocation", createLocation);
router.get("/getlocation", getLocation);
router.post("/adddestination", createDestination);
router.put("/updatedestination", updateDestination);
router.get("/getdestination", getAllDestinations);

export default router;
