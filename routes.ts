import {Router} from 'express';
import AuthController from './src/controllers/AuthController';
import { AuthMiddleware } from './src/middlewares/AuthMiddleware';
import { AuthorizationMiddleware } from './src/middlewares/AuthorizationMiddleware';

const authController = new AuthController();
const router = Router();

router.post('/auth', authController.execute);
router.post('/auth/refresh-token', authController.refreshToken);
router.get("/users", AuthMiddleware, authController.get);

router.get('/admin/project', AuthMiddleware, AuthorizationMiddleware('project', ['getAll']), () => console.log('eae'));

export default router;