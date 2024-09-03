const express = require('express');
const User = require('../models/User');
const Thought = require('../models/Thought');

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find().populate('thoughts').populate('friends');
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET single user by _id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST a new user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json(err);
    }
});

// PUT to update a user by _id
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE a user by _id
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        await Thought.deleteMany({ username: req.params.id }); 
        res.status(204).end();
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST to add a friend
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friend = await User.findById(req.params.friendId);
        if (!user || !friend) return res.status(404).json({ message: 'User or Friend not found' });

        user.friends.push(friend._id);
        await user.save();

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE to remove a friend
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.friends.pull(req.params.friendId);
        await user.save();

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
