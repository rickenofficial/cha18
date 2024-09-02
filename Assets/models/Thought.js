const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reactionSchema = require('./Reaction'); 

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
        get: (createdAtVal) => new Date(createdAtVal).toLocaleDateString()
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema] 
});

// Virtual for reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

module.exports = mongoose.model('Thought', thoughtSchema);
