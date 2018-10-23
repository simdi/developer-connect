const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true },
    phone: { type: Schema.Types.String, require: true },
    password: { type: Schema.Types.String, required: true },
    avatar: { type: Schema.Types.String, required: false },
    createdAt: { type: Schema.Types.Date, default: Date.now() }
});

module.exports = User = mongoose.model('users', UserSchema);