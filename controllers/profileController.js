const asyncHandler = require('express-async-handler');
const Profile = require('../models/Profile');

// Get user profile
const getProfile = asyncHandler(async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.user.id });
        if (profile) {
            res.status(200).json(profile);
        } else {
            res.status(404).json({message: 'Profile not found'});
        }
    } catch (err) {
        res.status(500).json({message: "Internal Server Error"});
    }
});

// Create or update user profile
const createOrUpdateProfile = asyncHandler(async (req, res) => {
    const { bio, interests, ecoFriendlyActions, posts, followers } = req.body;
    const profileFields = {
        user: req.user.user.id,
        bio,
        interests,
        ecoFriendlyActions,
        posts,
        followers
    };

    try {
        let profile = await Profile.findOne({ user: req.user.user.id });
        if (profile) {
            profile = await Profile.findOneAndUpdate(
                { user: req.user.user.id },
                { $set: profileFields },
                { new: true }
            );
        } else {
            profile = new Profile(profileFields);
            await profile.save();
        }
        res.status(201).json(profile);
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
});

// Add eco-friendly action
const addEcoFriendlyAction = asyncHandler(async (req, res) => {
    const { action } = req.body;
    try {
        const profile = await Profile.findOne({ user: req.user.user.id });
        if (profile) {
            profile.ecoFriendlyActions.push({ action, date: new Date() });
            await profile.save();
            res.json(profile);
        } else {
            res.status(404).json({ message: 'Profile not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Add post
const addPost = asyncHandler(async (req, res) => {
    const { content } = req.body;
    try {
        const profile = await Profile.findOne({ user: req.user.user.id });
        if (profile) {
            profile.posts.push({ content, date: new Date() });
            await profile.save();
            res.json(profile);
        } else {
            res.status(404).json({ message: 'Profile not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Like a post
const likePost = asyncHandler(async (req, res) => {
    const { postId } = req.body;
    try {
        const profile = await Profile.findOne({ user: req.user.user.id });
        if (profile) {
            const post = profile.posts.id(postId);
            console.log(post)
            if (post) {
                if (!post.likes.includes(req.user.user.id)) {
                    post.likes.push(req.user.user.id);
                    await profile.save();
                    res.json(profile);
                } else {
                    res.status(400).json({ message: 'Post already liked' });
                }
            } else {
                res.status(404).json({ message: 'Post not found' });
            }
        } else {
            res.status(404).json({ message: 'Profile not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Comment on a post
const commentOnPost = asyncHandler(async (req, res) => {
    const { postId, content } = req.body;
    try {
        const profile = await Profile.findOne({ user: req.user.user.id });
        if (profile) {
            const post = profile.posts.id(postId);
            if (post) {
                post.comments.push({ user: req.user.user.id, content, date: new Date() });
                await profile.save();
                res.json(profile);
            } else {
                res.status(404).json({ message: 'Post not found' });
            }
        } else {
            res.status(404).json({ message: 'Profile not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = {
    getProfile,
    createOrUpdateProfile,
    addEcoFriendlyAction,
    addPost,
    likePost,
    commentOnPost
};
