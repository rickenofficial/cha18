const mongoose = require('mongoose');
const validator = require('validator');

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    thoughts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
});

// Virtual field for friend count
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Create the model
module.exports = mongoose.model('User', userSchema);
