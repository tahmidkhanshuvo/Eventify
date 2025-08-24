require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI;
// Provide default credentials for development if not set in .env
const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL || 'superadmin@example.com';
const SUPER_ADMIN_PASSWORD = process.env.SUPER_ADMIN_PASSWORD || 'supersecretpassword123';

const seedSuperAdmin = async () => {
  try {
    // Don't use deprecated options
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected for seeding...');

    // Check if a Super Admin already exists
    const superAdminExists = await User.findOne({ role: 'Super Admin' });

    if (superAdminExists) {
      console.log('Super Admin account already exists. No action taken.');
      return;
    }

    // Create the Super Admin user
    const superAdmin = new User({
      username: 'superadmin',
      email: SUPER_ADMIN_EMAIL,
      password: SUPER_ADMIN_PASSWORD, // The password will be hashed by the pre-save hook
      role: 'Super Admin',
      status: 'Approved' // Super Admins are always approved by default
    });

    await superAdmin.save();
    console.log('Super Admin account created successfully!');

  } catch (error) {
    console.error('Error during database seeding:', error.message);
  } finally {
    // Ensure the connection is closed
    await mongoose.disconnect();
    console.log('MongoDB connection closed.');
  }
};

seedSuperAdmin();
