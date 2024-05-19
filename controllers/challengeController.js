const asyncHandler = require('express-async-handler');
const Challenge = require('../models/Challenge');

// Get all challenges
const getChallenges = asyncHandler(async (req, res) => {
  const challenges = await Challenge.find();
  res.json(challenges);
});

// Create a challenge
const createChallenge = asyncHandler(async (req, res) => {
  const { title, description, reward } = req.body;

  const challenge = new Challenge({
    title,
    description,
    reward,
    participants: [],
    completedBy: []
  });

  const createdChallenge = await challenge.save();
  res.status(201).json(createdChallenge);
});

// Join a challenge
const joinChallenge = asyncHandler(async (req, res) => {
  const challenge = await Challenge.findById(req.params.id);

  if (challenge) {
    if (!challenge.participants.includes(req.user.user.id)) {
      challenge.participants.push(req.user.user.id);
      await challenge.save();
      res.json({ message: 'Joined challenge' });
    } else {
      res.status(400).json({msg: 'Already Joined'});
    }
  } else {
    res.status(404).json({msg: 'Challenge not found'});
  }
});

// Complete a challenge
const completeChallenge = asyncHandler(async (req, res) => {
  const challenge = await Challenge.findById(req.params.id);

  if (challenge) {
    challenge.completedBy.push({ user: req.user.user.id, date: new Date() });
    await challenge.save();
    res.json({ message: 'Challenge completed' });
  } else {
    res.status(404);
    throw new Error('Challenge not found');
  }
});

module.exports = { getChallenges, createChallenge, joinChallenge, completeChallenge };
