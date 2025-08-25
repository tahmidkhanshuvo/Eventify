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

// --- CORS setup ---
const allowedOrigins = [
  "http://localhost:5173",                // local frontend
  "https://eventify-3-14av.onrender.com" // deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// --- Routes ---
const authRoutes = require('./routes/auth');
const superadminRoutes = require('./routes/superadminRoutes');
const registrationRoutes = require('./routes/registrations');
const chatbotRoutes = require('./routes/chatbot');
const certificateRoutes = require('./routes/certificates');
const userRoutes = require('./routes/users');

app.get('/', (req, res) => {
  res.send('Eventify API is running!');
});

// Mount under /api/*
app.use('/api/auth', authRoutes);
app.use('/api/superadmin', superadminRoutes);
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/registrations', registrationRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/users', userRoutes);

let server;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('✅ Successfully connected to MongoDB!');
      server = app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error('❌ Connection failed!', error);
    });
}

module.exports = { app, getTestServer: () => server, closeServer: () => server && server.close() };
