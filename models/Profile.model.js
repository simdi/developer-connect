const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
    name: { ype: Schema.type.String, required: true }
});

module.exports = Profile = mongoose.model('Profiles', ProfileSchema);