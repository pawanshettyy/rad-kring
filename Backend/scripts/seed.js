const mongoose = require('mongoose');
require('dotenv').config();

const { connectDB } = require('../config/database');
const { seedDatabase } = require('../utils/seedData');

const runSeeder = async () => {
  try {
    console.log('🔗 Connecting to database...');
    await connectDB();
    
    console.log('🌱 Running database seeder...');
    await seedDatabase();
    
    console.log('✅ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

runSeeder();
