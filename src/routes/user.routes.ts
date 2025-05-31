import { Router } from "express";
import { CreateUser } from "../controllers/user/createUser.controller";
import { userLogin } from "../controllers/user/userLogin.controller";
import { logout } from "../controllers/user/userLogout.controller";
import { getUser } from "../controllers/user/getUser.controller";

const router = Router();

router.post("/createUser", CreateUser);
router.get("/getuser", getUser);
router.post("/login", userLogin);
router.post("/logout", logout);

export default router;
