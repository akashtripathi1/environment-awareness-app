const asyncHandler = require('express-async-handler');
const Resource = require('../models/Resource');

// Get all resources
const getResources = asyncHandler(async (req, res) => {
  const resources = await Resource.find();
  res.json(resources);
});

// Create a resource
const createResource = asyncHandler(async (req, res) => {
  const { title, content, type } = req.body;

  const resource = new Resource({
    title,
    content,
    type,
    sharedBy: req.user.user.id,
    date: new Date()
  });

  const createdResource = await resource.save();
  res.status(201).json(createdResource);
});

// Delete a resource
const deleteResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id);

  if (resource) {
    if (resource.sharedBy.toString() === req.user.user.id.toString()) {
      await Resource.deleteOne({ _id: req.params.id });
      res.json({ message: 'Resource removed' });
    } else {
      res.status(401).json({msg: 'Not authorized to delete this resource'});
      
    }
  } else {
    res.status(404).json({msg: 'Resource not found'});
  }
});

module.exports = { getResources, createResource, deleteResource };
