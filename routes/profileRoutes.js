const express = require('express');
const {
    getProfile,
    createOrUpdateProfile,
    addEcoFriendlyAction,
    addPost,
    likePost,
    commentOnPost
} = require('../controllers/profileController');

const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(authMiddleware, getProfile)
  .post(authMiddleware, createOrUpdateProfile);

router.route('/actions')
  .post(authMiddleware, addEcoFriendlyAction);

router.route('/posts')
  .post(authMiddleware, addPost);

router.route('/posts/like')
  .post(authMiddleware, likePost);

router.route('/posts/comment')
  .post(authMiddleware, commentOnPost);

module.exports = router;
