const express = require('express');
const { sendMessage, likeMessage, getMessages } = require('../controller/msgCntrl');
const { auth } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/',auth,  sendMessage);
router.put('/:messageId/like',auth, likeMessage);
router.get('/:groupId',auth,  getMessages);

module.exports = router;
