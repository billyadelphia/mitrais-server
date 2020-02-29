import { Router } from 'express';
import LoginController from '../controllers/loginController';
import RegisterController from '../controllers/registerController';
let router = Router();

router.post("/auth/checkLogin", LoginController.checkToken);
router.post("/auth/login", LoginController.index);
router.post("/auth/register", RegisterController.index);

export default router;