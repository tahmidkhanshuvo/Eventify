const mongoose = require('mongoose');
const { app } = require('../index');
const User = require('../models/User');

let server;

beforeAll(async () => {
  // Set test environment
  process.env.NODE_ENV = 'test';
  
  await mongoose.connect(process.env.MONGO_URI_TEST);

  // Clear all collections ONCE before the tests start
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }

  // Seed the Super Admin user ONCE
  await User.create({
    username: 'superadmin',
    email: 'superadmin@example.com',
    password: 'supersecretpassword123',
    role: 'Super Admin',
    status: 'Approved',
    fullName: 'Super Admin',
  });

  // Start the server for the tests
  server = app.listen(); 
  global.server = server;
  global.app = app;
});


afterAll(async () => {
  // Close the server and database connection after all tests are done
  await mongoose.connection.close();
  server.close();
});