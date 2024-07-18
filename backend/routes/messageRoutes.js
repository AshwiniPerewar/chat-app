const express = require('express');
const { sendMessage, likeMessage, getMessages, getLikedUsers } = require('../controller/msgCntrl');
const { auth } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/',auth,  sendMessage);
router.put('/:messageId/like',auth, likeMessage);
router.get('/:groupId',auth,  getMessages);
router.get("/:messageId/likes",auth,getLikedUsers);

module.exports = router;
