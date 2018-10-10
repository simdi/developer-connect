const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const PostSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    text: { type: Schema.Types.String, required: true },
    name: { type: Schema.Types.String, required: false },
    avatar: { type: Schema.Types.String, required: false },
    likes: [{
        user: { type: Schema.Types.ObjectId, ref: 'users' },
    }],
    comments: [{
        user: { type: Schema.Types.ObjectId, ref: 'users' },
        text: { type: Schema.Types.String, required: true },
        name: { type: Schema.Types.String, required: false },
        avatar: { type: Schema.Types.String, required: false },
        date: { type: Date, default: Date.now() }
    }],
    date: { type: Date, default: Date.now() }
});

module.exports = Post = mongoose.model('post', PostSchema);