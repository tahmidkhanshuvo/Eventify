const express = require('express');
const router = express.Router();
const {
    getOrganizerRequests,
    approveOrganizerRequest,
    rejectOrganizerRequest,
} = require('../controllers/superAdminController');
const { protect, isSuperAdmin } = require('../middleware/authMiddleware');

// Get all pending organizer requests
router.get(
    '/requests',
    protect,
    isSuperAdmin,
    getOrganizerRequests
);

// Approve an organizer's request
router.post(
    '/requests/:userId/approve',
    protect,
    isSuperAdmin,
    approveOrganizerRequest
);

// Reject an organizer's request
router.post(
    '/requests/:userId/reject',
    protect,
    isSuperAdmin,
    rejectOrganizerRequest
);

module.exports = router;