require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const {
  MONGO_URI,
  SUPER_ADMIN_EMAIL,
  SUPER_ADMIN_PASSWORD,
  SUPER_ADMIN_USERNAME,
  SUPER_ADMIN_FULLNAME,
} = process.env;

async function seedSuperAdmin() {
  if (!MONGO_URI) throw new Error('Missing MONGO_URI in .env');

  await mongoose.connect(MONGO_URI);
  console.log('MongoDB connected for seeding…');

  const email = (SUPER_ADMIN_EMAIL || 'sudo@eventify.com').toLowerCase().trim();
  const username = (SUPER_ADMIN_USERNAME || 'superadmin').trim();
  const password = SUPER_ADMIN_PASSWORD || 'sudo2025';
  const fullName = SUPER_ADMIN_FULLNAME || 'Eventify Admin';

  // If any Super Admin exists, do nothing
  const superAdminExists = await User.findOne({ role: 'Super Admin' });
  if (superAdminExists) {
    console.log(`Super Admin already exists (${superAdminExists.email}). No action taken.`);
    await mongoose.disconnect();
    console.log('MongoDB connection closed.');
    return;
  }

  // Create the Super Admin (password will be hashed by pre-save hook)
  await User.create({
    fullName,
    username,
    email,
    password,
    role: 'Super Admin',
    status: 'Approved',
  });

  console.log('✅ Super Admin account created successfully!');
  console.log({ email, username });

  await mongoose.disconnect();
  console.log('MongoDB connection closed.');
}

seedSuperAdmin().catch((err) => {
  console.error('Error during database seeding:', err);
  process.exit(1);
});
