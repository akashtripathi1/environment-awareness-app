const mongoose = require('mongoose');

const challengeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  reward: String,
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  completedBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
