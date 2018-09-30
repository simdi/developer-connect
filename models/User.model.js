const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: Schema.type.String,
        required: true
    },
    email: {
        type: Schema.type.String,
        required: true
    },
    password: {
        type: Schema.type.String,
        required: true
    },
    avatar: {
        type: Schema.type.String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = User = mongoose.model('users', UserSchema);