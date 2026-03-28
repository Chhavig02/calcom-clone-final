import mongoose, { Schema, Document } from 'mongoose';

export interface IAvailability extends Document {
  userId: mongoose.Types.ObjectId;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  timezone: string;
}

const AvailabilitySchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  dayOfWeek: { type: Number, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  timezone: { type: String, default: 'UTC' },
}, { timestamps: true });

export default mongoose.model<IAvailability>('Availability', AvailabilitySchema);
