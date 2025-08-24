const express = require('express');
const router = express.Router();
const {
    registerStudent,
    registerOrganizer,
    loginUser
} = require('../controllers/authController');

router.post('/register/student', registerStudent);
router.post('/register/organizer', registerOrganizer);
router.post('/login', loginUser);

module.exports = router;