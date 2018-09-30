const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
    name: {
        type: Schema.type.String,
        required: true
    }
});

module.exports = ProfileSchema;