const express = require('express');
const router = express.Router();
const {
  registerStudent,
  registerOrganizer,
  loginUser,
  logoutUser,
  getMe, // NEW
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register/student', registerStudent);
router.post('/register/organizer', registerOrganizer);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// NEW: return current authed user (reads token from cookie or Bearer)
router.get('/me', protect, getMe);

module.exports = router;
