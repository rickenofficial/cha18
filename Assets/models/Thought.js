const mongoose = require('mongoose');
const { Schema } = mongoose;
const reactionSchema = require('./Reaction'); // Ensure the path is correct

// Define the thought schema
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => new Date(timestamp).toLocaleDateString() 
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
}, {
    toJSON: {
        getters: true
    },
    id: false
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
