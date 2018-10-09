const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    handle: { type: Schema.Types.String, required: true, max: 40 },
    company: { type: Schema.Types.String, required: false },
    website: { type: Schema.Types.String, required: false },
    location: { type: Schema.Types.String, required: false },
    status: { type: Schema.Types.String, required: true },
    skills: { type: [ Schema.Types.String ], required: true },
    bio: { type: Schema.Types.String, required: false },
    githubUsername: { type: Schema.Types.String, required: false },
    experience: [
        { 
            title: { type: Schema.Types.String, required: true },
            company: { type: Schema.Types.String, required: true },
            location: { type: Schema.Types.String, required: true },
            from: { type: Schema.Types.Date, required: true },
            to: { type: Schema.Types.Date, required: false },
            current: { type: Boolean, required: false, default: false },
            description: { type: Schema.Types.String, required: false }
        }
    ],
    education: [
        { 
            school: { type: Schema.Types.String, required: true },
            degree: { type: Schema.Types.String, required: true },
            fieldOfStudy: { type: Schema.Types.String, required: true },
            location: { type: Schema.Types.String, required: true },
            from: { type: Schema.Types.Date, required: true },
            to: { type: Schema.Types.Date, required: false },
            current: { type: Schema.Types.Boolean, required: false, default: false },
            description: { type: Schema.Types.String, required: false }
        }
    ],
    social: {
        youtube: { type: Schema.Types.String, required: false },
        twitter: { type: Schema.Types.String, required: false },
        facebook: { type: Schema.Types.String, required: false },
        linkedin: { type: Schema.Types.String, required: false },
        instagram: { type: Schema.Types.String, required: false }
    },
    date: { type: Schema.Types.Date, default: Date.now() }
});

module.exports = Profile = mongoose.model('Profiles', ProfileSchema);