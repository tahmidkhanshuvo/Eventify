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
} = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

const canManageEvents = (req, res, next) => {
    if (req.user && (req.user.role === 'Organizer' || req.user.role === 'Super Admin')) {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: Access is restricted to Organizers or Super Admins.' });
    }
};

const isStudent = (req, res, next) => {
    if (req.user && req.user.role === 'Student') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: Access is restricted to Students.' });
    }
};

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', protect, canManageEvents, createEvent);
router.put('/:id', protect, canManageEvents, updateEvent);
router.delete('/:id', protect, canManageEvents, deleteEvent);
router.get('/:id/attendees', protect, getEventAttendees);
router.post('/:id/register', protect, isStudent, registerForEvent);
router.delete('/:id/unregister', protect, isStudent, unregisterFromEvent);

module.exports = router;