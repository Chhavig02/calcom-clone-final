import mongoose from 'mongoose';
import dotenv from 'dotenv';
import EventType from './src/models/EventType.js';
import Availability from './src/models/Availability.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await EventType.deleteMany({});
    await Availability.deleteMany({});

    // Sample Event Types
    const eventTypes = [
      {
        title: '15 Minute Meeting',
        description: 'Quick 15-minute sync-up.',
        duration: 15,
        slug: '15min',
        isEnabled: true,
      },
      {
        title: '30 Minute Meeting',
        description: 'Standard 30-minute consultation.',
        duration: 30,
        slug: '30min',
        isEnabled: true,
      },
      {
        title: '60 Minute Strategy Session',
        description: 'Deep dive into projects and strategy.',
        duration: 60,
        slug: '60min',
        isEnabled: true,
      },
    ];

    await EventType.insertMany(eventTypes);
    console.log('Seed: Event Types created.');

    // Sample Weekly Availability
    const availability = [
      { dayOfWeek: 1, startTime: '09:00', endTime: '17:00' }, // Mon
      { dayOfWeek: 2, startTime: '09:00', endTime: '17:00' }, // Tue
      { dayOfWeek: 3, startTime: '09:00', endTime: '17:00' }, // Wed
      { dayOfWeek: 4, startTime: '09:00', endTime: '17:00' }, // Thu
      { dayOfWeek: 5, startTime: '09:00', endTime: '17:00' }, // Fri
    ];

    await Availability.insertMany(availability);
    console.log('Seed: Availability created.');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
