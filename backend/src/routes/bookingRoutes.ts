import express, { Request, Response, NextFunction } from 'express';
import { createBooking, getBookings, cancelBooking } from '../controllers/bookingController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

const protect = (req: Request, res: Response, next: NextFunction) => authMiddleware(req as any, res, next);

router.post('/', (req: Request, res: Response) => createBooking(req, res));
router.get('/', protect, (req: Request, res: Response) => getBookings(req as any, res));
router.patch('/:id/cancel', protect, (req: Request, res: Response) => cancelBooking(req as any, res));

export default router;
