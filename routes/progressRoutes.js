const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');

router.post('/', progressController.saveProgress);
router.get('/:userId/:videoId', progressController.getProgress);
router.post('/reset', progressController.resetProgress); // Add this line

module.exports = router;