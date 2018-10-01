const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, require: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false },
    createdAt: { type: Date, default: Date.now() }
});

module.exports = User = mongoose.model('users', UserSchema);