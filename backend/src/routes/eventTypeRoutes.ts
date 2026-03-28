import express, { Request, Response, NextFunction } from 'express';
import { createEventType, getEventTypes, getEventTypeBySlug, updateEventType, deleteEventType } from '../controllers/eventTypeController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Public
router.get('/', (req: Request, res: Response) => getEventTypes(req as any, res));
router.get('/slug/:slug', (req: Request, res: Response) => getEventTypeBySlug(req as any, res));

// Protected
const protect = (req: Request, res: Response, next: NextFunction) => authMiddleware(req as any, res, next);
router.post('/', protect, (req: Request, res: Response) => createEventType(req as any, res));
router.put('/:id', protect, (req: Request, res: Response) => updateEventType(req as any, res));
router.delete('/:id', protect, (req: Request, res: Response) => deleteEventType(req as any, res));

export default router;
