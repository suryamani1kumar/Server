import { Router } from "express";
import {
  CreateUser,
  deleteUser,
  HandlePassword,
} from "../controllers/user/createUser.controller";
import {
  authVerify,
  userLogin,
} from "../controllers/user/userLogin.controller";
import { logout } from "../controllers/user/userLogout.controller";
import { getUser, singleUser } from "../controllers/user/getUser.controller";
import {
  updateUser,
  userStatus,
} from "../controllers/user/updateUser.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
// import { roleMiddleware } from "../middlewares/config.middleware";

const router = Router();

/*  PUBLIC ROUTES  */
router.post("/login", userLogin);

/*  AUTHENTICATED ROUTES   */
router.get("/logout", authMiddleware, logout);
router.get("/auth/verify", authMiddleware, authVerify);

/* ADMIN / SUPERADMIN ROUTES */
router.post(
  "/createUser",
  authMiddleware,
  // roleMiddleware("admin", "superadmin"),
  CreateUser,
);
router.get("/getuser", authMiddleware, getUser);
router.get("/getsingleuser", authMiddleware, singleUser);
router.patch("/userStatus", authMiddleware, userStatus);
router.patch("/changepassword", authMiddleware, HandlePassword);
router.delete("/deleteUser", authMiddleware, deleteUser);
router.put("/updateUser", authMiddleware, updateUser);

export default router;
