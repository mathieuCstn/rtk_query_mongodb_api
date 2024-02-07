const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        // minLength: 10,
        required: true,
        lowercase: true,
    },
    age: Number,
    bio: String,
});

module.exports = model('User', userSchema);
