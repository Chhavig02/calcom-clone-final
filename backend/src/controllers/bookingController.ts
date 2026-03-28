import { Request, Response } from 'express';
import Booking from '../models/Booking.js';
import EventType from '../models/EventType.js';
import { AuthRequest } from '../middleware/authMiddleware.js';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { eventTypeId, bookerName, bookerEmail, startTime, endTime } = req.body;

    // Check for double booking
    const conflict = await Booking.findOne({
      eventTypeId,
      status: 'UPCOMING',
      $or: [
        { startTime: { $lt: new Date(endTime) }, endTime: { $gt: new Date(startTime) } }
      ]
    });

    if (conflict) {
      res.status(409).json({ message: 'This time slot is already booked.' });
      return;
    }

    const newBooking = new Booking({ eventTypeId, bookerName, bookerEmail, startTime, endTime });
    await newBooking.save();

    const populated = await newBooking.populate('eventTypeId');
    res.status(201).json(populated);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getBookings = async (req: AuthRequest, res: Response) => {
  try {
    // Get event types belonging to this user, then get bookings for those events
    const userEventTypes = await EventType.find({ userId: req.userId }).select('_id');
    const eventTypeIds = userEventTypes.map(e => e._id);

    const bookings = await Booking.find({ eventTypeId: { $in: eventTypeIds } })
      .populate('eventTypeId')
      .sort({ startTime: 1 });
    res.json(bookings);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const cancelledBooking = await Booking.findByIdAndUpdate(
      id,
      { status: 'CANCELLED' },
      { new: true }
    );
    res.json(cancelledBooking);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
