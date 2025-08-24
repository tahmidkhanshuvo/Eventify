const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { updateClubLogo } = require('../controllers/userController');
const { makeUploader } = require('../middleware/upload');
const { validateExactImage } = require('../middleware/validateImage');

// 2 MB max, exactly 1080x1080
const uploadLogo = makeUploader(2 * 1024 * 1024);

router.patch(
  '/:id/club-logo',
  protect,
  uploadLogo.single('logo'),
  validateExactImage(1080, 1080),
  updateClubLogo
);

module.exports = router;
