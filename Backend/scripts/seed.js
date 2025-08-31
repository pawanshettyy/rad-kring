// Backend/scripts/seed.js
const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../.env' });
const Contact = require('../models/Contact');
const Newsletter = require('../models/Newsletter');
const CareerApplication = require('../models/CareerApplication');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB');

  // Insert sample contact
  await Contact.create({
    name: 'Test User',
    email: 'testuser@example.com',
    message: 'Hello, this is a test contact.'
  });

  // Insert sample newsletter subscriber
  await Newsletter.create({
    email: 'subscriber@example.com'
  });

  // Insert sample career application
  await CareerApplication.create({
    name: 'Applicant Name',
    email: 'applicant@example.com',
    phone: '1234567890',
    position: 'Software Engineer',
    resumeUrl: 'https://example.com/resume.pdf',
    message: 'Looking forward to joining your team!'
  });

  console.log('Sample data seeded.');
  mongoose.disconnect();
}

seed().catch(err => {
  console.error('Seeding error:', err);
  mongoose.disconnect();
});
