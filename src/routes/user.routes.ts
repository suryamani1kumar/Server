import { Router } from "express";
import { CreateUser } from "../controllers/user/createUser.controller";
import {
  authVerify,
  userLogin,
} from "../controllers/user/userLogin.controller";
import { logout } from "../controllers/user/userLogout.controller";
import { getUser } from "../controllers/user/getUser.controller";
import {
  updateUser,
  userStatus,
} from "../controllers/user/updateUser.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/createUser", CreateUser);
router.get("/getuser", getUser);
router.patch("/userStatus", userStatus);
router.put("/updateUser", updateUser);
router.post("/login", userLogin);
router.post("/logout", logout);
router.get("/auth/verify", authMiddleware, authVerify);

export default router;
