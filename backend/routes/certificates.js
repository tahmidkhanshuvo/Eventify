const express = require('express');
const router = express.Router();
const { generateCertificate } = require('../controllers/certificateController');
const { protect } = require('../middleware/authMiddleware');

const isStudent = (req, res, next) => {
    if (req.user && req.user.role === 'Student') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: This action is restricted to students.' });
    }
};

router.get(
    '/event/:eventId',
    protect,
    isStudent,
    generateCertificate
);

module.exports = router;