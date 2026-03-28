import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  eventTypeId: mongoose.Types.ObjectId;
  bookerName: string;
  bookerEmail: string;
  startTime: Date;
  endTime: Date;
  status: 'UPCOMING' | 'PAST' | 'CANCELLED';
}

const BookingSchema: Schema = new Schema({
  eventTypeId: { type: Schema.Types.ObjectId, ref: 'EventType', required: true },
  bookerName: { type: String, required: true },
  bookerEmail: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { type: String, enum: ['UPCOMING', 'PAST', 'CANCELLED'], default: 'UPCOMING' },
}, { timestamps: true });

// Check for conflicting bookings
BookingSchema.index({ eventTypeId: 1, startTime: 1, endTime: 1 });

export default mongoose.model<IBooking>('Booking', BookingSchema);
