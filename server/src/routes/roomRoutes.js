
const express = require('express');
const roomController = require('../controller/roomController');
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router();

router.post('/',authMiddleware.protect,roomController.createRoom);
router.get('/:code',authMiddleware.protect,roomController.getByRoomId);
router.post('/:code/question',authMiddleware.protect,roomController.createQuestion);
router.get('/:code/question',authMiddleware.protect,roomController.getQuestions);
router.get('/:code/summary',authMiddleware.protect,roomController.summarizeQuestions)

module.exports = router;