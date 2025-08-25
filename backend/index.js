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

// --- CORS setup --- //
const allowedOrigins = [
  process.env.APP_URL_LOCAL,  // e.g. http://localhost:5173
  process.env.APP_URL         // e.g. https://your-frontend.onrender.com
].filter(Boolean);

// Helper: check if origin matches exactly or is a *.onrender.com URL
function isAllowedOrigin(origin) {
  if (allowedOrigins.includes(origin)) return true;

  // Allow any Render frontend (*.onrender.com)
  if (origin && /\.onrender\.com$/.test(origin)) {
    return true;
  }

  return false;
}

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("🛰 Incoming request from:", origin);
      if (!origin) return callback(null, true); // allow Postman, curl
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// --- Routes --- //
const authRoutes = require('./routes/auth');
const superadminRoutes = require('./routes/superadminRoutes');
const registrationRoutes = require('./routes/registrations');
const chatbotRoutes = require('./routes/chatbot');
const certificateRoutes = require('./routes/certificates');
const userRoutes = require('./routes/users');

app.get('/', (req, res) => {
  res.send('Eventify API is running!');
});

app.use('/api/auth', authRoutes);
app.use('/api/superadmin', superadminRoutes);
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/registrations', registrationRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/users', userRoutes);

// --- Mongo & Server --- //
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
