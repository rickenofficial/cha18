const express = require('express');
const Thought = require('../models/Thought');
const User = require('../models/User');

const router = express.Router();

// GET all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET single thought by _id
router.get('/:id', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!thought) return res.status(404).json({ message: 'Thought not found' });
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST to create a new thought
router.post('/', async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } });
        res.status(201).json(newThought);
    } catch (err) {
        res.status(400).json(err);
    }
});

// PUT to update a thought by _id
router.put('/:id', async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedThought) return res.status(404).json({ message: 'Thought not found' });
        res.json(updatedThought);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE to remove a thought by _id
router.delete('/:id', async (req, res) => {
    try {
        await Thought.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST to create a reaction
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) return res.status(404).json({ message: 'Thought not found' });

        thought.reactions.push(req.body);
        await thought.save();

        res.json(thought);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE to remove a reaction by reactionId
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) return res.status(404).json({ message: 'Thought not found' });

        thought.reactions.pull({ _id: req.params.reactionId });
        await thought.save();

        res.json(thought);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
