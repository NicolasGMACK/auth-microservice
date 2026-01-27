import {Router} from 'express';
import AuthController from './src/controllers/AuthController';

const authController = new AuthController();
const router = Router();

router.post('/auth', authController.execute);
router.post('/auth/refresh', authController.refreshToken);

export default router;