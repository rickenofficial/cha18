const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

// Define the reaction schema
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId, // Use Schema.Types.ObjectId to define the ObjectId field
        default: () => new Types.ObjectId() // Use new Types.ObjectId() for default value
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => new Date(timestamp).toLocaleDateString() // Optional: Format the date
    }
}, {
    toJSON: {
        getters: true
    },
    id: false
});

module.exports = reactionSchema;
