import { Request, Response } from 'express';
import Availability from '../models/Availability.js';
import { AuthRequest } from '../middleware/authMiddleware.js';

export const updateAvailability = async (req: Request & { userId?: string }, res: Response) => {
  try {
    const { availability } = req.body;
    // Delete old records for this user (or global if no userId)
    const filter = req.userId ? { userId: req.userId } : {};
    await Availability.deleteMany(filter);

    // Add userId to each entry
    const dataToInsert = availability.map((a: any) => ({
      ...a,
      userId: req.userId || undefined,
    }));
    const newAvailability = await Availability.insertMany(dataToInsert);
    res.json(newAvailability);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAvailability = async (req: Request & { userId?: string }, res: Response) => {
  try {
    const filter = req.userId ? { userId: req.userId } : {};
    const availability = await Availability.find(filter);
    res.json(availability);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
