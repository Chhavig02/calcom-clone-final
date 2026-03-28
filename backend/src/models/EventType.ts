import mongoose, { Schema, Document } from 'mongoose';

export interface IEventType extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  duration: number;
  slug: string;
  isEnabled: boolean;
  location: string;
}

const EventTypeSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  duration: { type: Number, required: true },
  slug: { type: String, required: true },
  isEnabled: { type: Boolean, default: true },
  location: { type: String, default: 'Video call' },
}, { timestamps: true });

export default mongoose.model<IEventType>('EventType', EventTypeSchema);
