require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- This are for controllers ---
const authRoutes = require('./routes/auth');
const superAdminRoutes = require('./routes/superAdmin');
const eventRoutes = require('./routes/events');
const registrationRoutes = require('./routes/registrations');
const chatbotRoutes = require('./routes/chatbot');
const certificateRoutes = require('./routes/certificates');

app.get('/', (req, res) => {
  res.send('Eventify API is running!');
});

// --- This are for routing ---
app.use('/api/auth', authRoutes);
app.use('/api/superadmin', superAdminRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/certificates', certificateRoutes);
// -----------------------------------------

let server;

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Successfully connected to MongoDB!");
      server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Connection failed!", error);
    });
}

module.exports = { app, getTestServer: () => server, closeServer: () => server && server.close() };