const express = require('express');
const Thought = require('../models/Thought');

const router = express.Router();

// Get all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new thought
router.post('/', async (req, res) => {
    try {
        const newThought = new Thought(req.body);
        await newThought.save();
        res.status(201).json(newThought);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a thought
router.put('/:id', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(thought);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a thought
router.delete('/:id', async (req, res) => {
    try {
        await Thought.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
