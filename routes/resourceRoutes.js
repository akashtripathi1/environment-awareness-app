const express = require('express');
const {
  getResources,
  createResource,
  deleteResource
} = require('../controllers/resourceController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(getResources)
  .post(authMiddleware, createResource);

router.route('/:id')
  .delete(authMiddleware, deleteResource);

module.exports = router;
