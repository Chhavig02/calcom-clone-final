import express, { Request, Response, NextFunction } from 'express';
import { getAvailability, updateAvailability } from '../controllers/availabilityController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

const protect = (req: Request, res: Response, next: NextFunction) => authMiddleware(req as any, res, next);

// Optional auth — public GET works for booking page, POST requires auth
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  authMiddleware(req as any, res, () => next());
}, (req: Request, res: Response) => getAvailability(req as any, res));

router.post('/', protect, (req: Request, res: Response) => updateAvailability(req as any, res));

export default router;
