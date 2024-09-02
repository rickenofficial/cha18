const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxlength: 280,
    },
    reactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reaction',
    }],
});

module.exports = mongoose.model('Thought', thoughtSchema);
