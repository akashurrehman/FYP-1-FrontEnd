const express = require('express');
const router = express.Router();
const { createMessage } = require('../../Controllers/chatController');

router.post('/message', createMessage);

module.exports = router;
