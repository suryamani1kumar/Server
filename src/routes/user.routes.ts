import { Router } from "express";
import { CreateUser } from "../controllers/user/createUser.controller";
import { userLogin } from "../controllers/user/userLogin.controller";
import { logout } from "../controllers/user/userLogout.controller";

const router = Router();

router.post("/createUser", CreateUser);
router.post("/login", userLogin);
router.post("/logout", logout);

export default router;
