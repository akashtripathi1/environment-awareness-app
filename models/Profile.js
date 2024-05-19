const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bio: String,
  interests: [String],
  ecoFriendlyActions: [{
    action: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  posts: [{
    content: String,
    date: {
      type: Date,
      default: Date.now
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    comments: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      content: String,
      date: {
        type: Date,
        default: Date.now
      }
    }]
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
