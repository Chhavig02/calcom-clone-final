import { Response } from 'express';
import EventType from '../models/EventType.js';
import { AuthRequest } from '../middleware/authMiddleware.js';

export const createEventType = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, duration, slug, location } = req.body;
    const newEventType = new EventType({
      userId: req.userId,
      title, description, duration, slug, location
    });
    await newEventType.save();
    res.status(201).json(newEventType);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getEventTypes = async (req: AuthRequest, res: Response) => {
  try {
    // If userId is provided (authenticated), return user's events. Otherwise return all for public booking.
    const filter = req.userId ? { userId: req.userId } : {};
    const eventTypes = await EventType.find(filter);
    res.json(eventTypes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventTypeBySlug = async (req: AuthRequest, res: Response) => {
  try {
    const { slug } = req.params;
    const eventType = await EventType.findOne({ slug });
    if (!eventType) {
      res.status(404).json({ message: 'Event type not found' });
      return;
    }
    res.json(eventType);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEventType = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updatedEventType = await EventType.findOneAndUpdate(
      { _id: id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!updatedEventType) {
      res.status(404).json({ message: 'Event type not found' });
      return;
    }
    res.json(updatedEventType);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteEventType = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await EventType.findOneAndDelete({ _id: id, userId: req.userId });
    res.json({ message: 'Event type deleted' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
