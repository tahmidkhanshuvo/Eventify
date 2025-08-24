require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// If you deploy behind a proxy and use secure cookies in prod, uncomment:
// app.set('trust proxy', 1);

app.use(express.json());
app.use(cookieParser());

// With Vite dev proxy you don't need CORS, but keeping a permissive fallback is fine.
// If you ever hit the API directly from a different origin, enable credentials:
/*
app.use(cors({
  origin: ['http://localhost:5173'], // your Vite dev server
  credentials: true,
}));
*/
app.use(cors());

// --- Routes ---
const authRoutes = require('./routes/auth');
const superAdminRoutes = require('./routes/superAdmin');
const eventRoutes = require('./routes/events');
const registrationRoutes = require('./routes/registrations');
const chatbotRoutes = require('./routes/chatbot');
const certificateRoutes = require('./routes/certificates');
const userRoutes = require('./routes/users'); // NEW

app.get('/', (req, res) => {
  res.send('Eventify API is running!');
});

// Mount under /api/*
app.use('/api/auth', authRoutes);
app.use('/api/superadmin', superAdminRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/users', userRoutes); // NEW

let server;

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Successfully connected to MongoDB!');
      server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error('Connection failed!', error);
    });
}

module.exports = { app, getTestServer: () => server, closeServer: () => server && server.close() };
