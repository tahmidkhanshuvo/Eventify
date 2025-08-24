const express = require('express');
const router = express.Router();
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
  unregisterFromEvent,
  getEventAttendees,
  updateEventBanner, // NEW
} = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');
const { makeUploader } = require('../middleware/upload');              // NEW
const { validateExactImage } = require('../middleware/validateImage'); // NEW

const canManageEvents = (req, res, next) => {
  if (req.user && (req.user.role === 'Organizer' || req.user.role === 'Super Admin')) {
     return next();
  }
  return res.status(403).json({ message: 'Forbidden: Access is restricted to Organizers or Super Admins.' });
};

const isStudent = (req, res, next) => {
  if (req.user && req.user.role === 'Student') return next();
  return res.status(403).json({ message: 'Forbidden: Access is restricted to Students.' });
};

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', protect, canManageEvents, createEvent);
router.put('/:id', protect, canManageEvents, updateEvent);
router.delete('/:id', protect, canManageEvents, deleteEvent);
router.get('/:id/attendees', protect, getEventAttendees);
router.post('/:id/register', protect, isStudent, registerForEvent);
router.delete('/:id/unregister', protect, isStudent, unregisterFromEvent);

// NEW: Banner upload (field "banner") — 5 MB max + EXACT 1920x1080
const uploadBanner = makeUploader(5 * 1024 * 1024);
router.patch(
  '/:id/banner',
  protect,
  canManageEvents,
  uploadBanner.single('banner'),
  validateExactImage(1920, 1080),
  updateEventBanner
);

module.exports = router;
