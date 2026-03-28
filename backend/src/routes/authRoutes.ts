import { Router, Request, Response, NextFunction } from 'express';
import { register, login, getMe, updateProfile } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', (req: Request, res: Response) => register(req, res));
router.post('/login', (req: Request, res: Response) => login(req, res));
router.get('/me', (req: Request, res: Response, next: NextFunction) => {
  authMiddleware(req as any, res, next);
}, (req: Request, res: Response) => getMe(req as any, res));
router.put('/profile', (req: Request, res: Response, next: NextFunction) => {
  authMiddleware(req as any, res, next);
}, (req: Request, res: Response) => updateProfile(req as any, res));

export default router;
