const asyncHandler = require('express-async-handler');
const Initiative = require('../models/Initiative');

const getInitiatives = asyncHandler(async (req, res) => {
  try {
    const initiatives = await Initiative.find();
    res.json(initiatives);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const createInitiative = asyncHandler(async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    const initiative = new Initiative({
      user: req.user.user.id,
      title,
      description,
      date,
      location
    });

    const createdInitiative = await initiative.save();
    res.status(201).json(createdInitiative);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const joinInitiative = asyncHandler(async (req, res) => {
  try {
    const initiative = await Initiative.findById(req.params.id);

    if (initiative) {
      if (!initiative.participants.includes(req.user.user.id)) {
        initiative.participants.push(req.user.user.id);
        await initiative.save();
        res.json({ message: 'Joined initiative' });
      } else {
        res.status(400).json({ message: 'Already joined' });
      }
    } else {
      res.status(404).json({ message: 'Initiative not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get participants of an initiative
const getInitiativeParticipants = async (req, res) => {

  try {
    const initiative = await Initiative.findById(req.params.id).populate('participants');

    if (!initiative) {
      return res.status(404).json({ message: 'Initiative not found' });
    }
    res.json(initiative.participants);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getInitiatives, createInitiative, joinInitiative, getInitiativeParticipants };
