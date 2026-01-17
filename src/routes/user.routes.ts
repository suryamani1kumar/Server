import { Router } from "express";
import { CreateUser } from "../controllers/user/createUser.controller";
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

const router = Router();

router.post("/createUser", CreateUser);
router.get("/getuser", getUser);
router.get("/getsingleuser", singleUser);
router.patch("/userStatus", userStatus);
router.put("/updateUser", updateUser);
router.post("/login", userLogin);
router.get("/logout", logout);
router.get("/auth/verify", authMiddleware, authVerify);

export default router;
