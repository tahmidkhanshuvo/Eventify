const express = require('express');
const router = express.Router();
const { getChatbotResponse } = require('../controllers/chatbotController');

router.post('/', getChatbotResponse);

module.exports = router;