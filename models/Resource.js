const mongoose = require('mongoose');

const resourceSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: String,
  type: {
    type: String,
    enum: ['Article', 'Video', 'Tip'],
    required: true
  },
  sharedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
