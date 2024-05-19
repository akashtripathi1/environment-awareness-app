const express = require('express');
const {
  getChallenges,
  createChallenge,
  joinChallenge,
  completeChallenge
} = require('../controllers/challengeController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(getChallenges)
  .post(authMiddleware, createChallenge);

router.route('/:id/join')
  .post(authMiddleware, joinChallenge);

router.route('/:id/complete')
  .post(authMiddleware, completeChallenge);

module.exports = router;
