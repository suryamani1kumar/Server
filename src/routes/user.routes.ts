import { Router } from 'express';
import { CreateUser } from '../controllers/user/createUser.controller';
import { userLogin } from '../controllers/user/userLogin.controller';

const router = Router();

router.post('/createUser', CreateUser);
router.post('/login', userLogin);

export default router;
