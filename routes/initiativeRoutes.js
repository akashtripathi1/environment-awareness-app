const express = require('express');
const { getInitiatives, createInitiative, joinInitiative, getInitiativeParticipants } = require('../controllers/initiativeController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(getInitiatives)
  .post(authMiddleware, createInitiative);

router.route('/:id/join')
  .post(authMiddleware, joinInitiative);

router.route('/:id/participants')
  .get(getInitiativeParticipants);  

module.exports = router;
