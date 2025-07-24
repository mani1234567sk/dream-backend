const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Public route for getting matches (no auth required for viewing)
router.get('/', matchController.getMatches);
router.post('/', authenticateToken, matchController.createMatch);
router.post('/:id/join', authenticateToken, matchController.joinMatch);
router.put('/:id', authenticateToken, matchController.updateMatch);
router.delete('/:id', authenticateToken, matchController.deleteMatch);

module.exports = router;
