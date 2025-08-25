// backend/routes/eventRoutes.js
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
  updateEventBanner,
} = require('../controllers/eventController');

const { protect } = require('../middleware/authMiddleware');

const multer = require('multer');
const sharp = require('sharp');

// ---- uploads: keep file in memory, cap size (~8 MB) ----
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
});

// ---- simple role gate ----
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}

// ---- allow any 16:9 up to 1920×1080; downscale if larger, never upscale ----
function isApprox16by9(w, h, epsilon = 0.02) {
  const ratio = w / h;
  const target = 16 / 9;
  return Math.abs(ratio - target) <= epsilon;
}

async function enforce16by9AndMax(req, res, next) {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  try {
    const img = sharp(req.file.buffer);
    const meta = await img.metadata();
    const { width, height, format } = meta || {};

    if (!width || !height) {
      return res.status(400).json({ message: 'Invalid image file.' });
    }

    // require ~16:9 aspect ratio (e.g., 1280×720, 1600×900, 1920×1080)
    if (!isApprox16by9(width, height)) {
      return res
        .status(400)
        .json({ message: 'Please upload a 16:9 image (e.g., 1280×720, 1600×900, 1920×1080).' });
    }

    // If either dimension exceeds the max, downscale to fit exactly within 1920×1080.
    // We do NOT enlarge smaller images.
    const needsResize = width > 1920 || height > 1080;

    if (needsResize) {
      req.file.buffer = await img
        .resize(1920, 1080, {
          fit: 'cover',            // with exact 16:9 inputs, this will just downscale without cropping
          position: 'center',
          withoutEnlargement: true // don’t upscale smaller images
        })
        .toFormat(format === 'png' ? 'png' : (format === 'webp' ? 'webp' : 'jpeg'), { quality: 90 })
        .toBuffer();
    }
    // else keep the original buffer (already <= 1920×1080 and 16:9)

    return next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid image file.' });
  }
}

/* ---------------- Public ---------------- */
router.get('/', getAllEvents);
router.get('/:id', getEventById);

/* ------------- Organizer/Admin ------------ */
// create / update / delete events
router.post('/', protect, requireRole('Organizer', 'Super Admin'), createEvent);
router.put('/:id', protect, requireRole('Organizer', 'Super Admin'), updateEvent);
router.delete('/:id', protect, requireRole('Organizer', 'Super Admin'), deleteEvent);

// view attendees
router.get(
  '/:id/attendees',
  protect,
  requireRole('Organizer', 'Super Admin'),
  getEventAttendees
);

// upload/replace banner (16:9, max 1920×1080; downscale if bigger)
router.post(
  '/:id/banner',
  protect,
  requireRole('Organizer', 'Super Admin'),
  upload.single('banner'),     // field name must be 'banner'
  enforce16by9AndMax,          // <= new validator/processor
  updateEventBanner
);

/* ---------------- Student ---------------- */
router.post('/:id/register', protect, registerForEvent);
router.delete('/:id/register', protect, unregisterFromEvent);

module.exports = router;
