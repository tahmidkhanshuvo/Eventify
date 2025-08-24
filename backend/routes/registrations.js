const express = require('express');
const router = express.Router();
const { getMyRegisteredEvents } = require('../controllers/registrationController');
const { protect } = require('../middleware/authMiddleware');

const isStudent = (req, res, next) => {
    if (req.user && req.user.role === 'Student') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: This route is only for students.' });
    }
};

router.get(
    '/my-events',
    protect,
    isStudent,
    getMyRegisteredEvents
);

module.exports = router;