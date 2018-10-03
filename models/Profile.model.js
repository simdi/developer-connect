const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: { type: Schema.type.ObjectId, ref: 'users' },
    handle: { type: String, required: true, max: 40 },
    company: { type: String, required: false },
    website: { type: String, required: false },
    location: { type: String, required: false },
    status: { type: String, required: true },
    skills: { type: [ String ], required: true },
    bio: { type: String, required: false },
    githubUsername: { type: String, required: false },
    experience: [
        { 
            title: { type: String, required: true },
            company: { type: String, required: true },
            location: { type: String, required: true },
            from: { type: Date, required: true },
            to: { type: Date, required: false },
            current: { type: Boolean, required: false, default: false },
            description: { type: String, required: false }
        }
    ],
    education: [
        { 
            school: { type: String, required: true },
            degree: { type: String, required: true },
            fieldOfStudy: { type: String, required: true },
            from: { type: Date, required: true },
            to: { type: Date, required: false },
            current: { type: Boolean, required: false, default: false },
            description: { type: String, required: false }
        }
    ],
    social: {
        youtube: { type: String, required: false },
        twitter: { type: String, required: false },
        facebook: { type: String, required: false },
        linkedin: { type: String, required: false },
        instagram: { type: String, required: false }
    },
    date: { type: Date, default: Date.now() }
});

module.exports = Profile = mongoose.model('Profiles', ProfileSchema);