/* 
    @Author: Chisimdi Damian Ezeanieto
    @Date: 30/10/2018
*/
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const Profile = require('../models/Profile.model');
const User = require('../models/User.model');
const validateProfileInput = require('../validation/profile');
const router = express.Router();

router.get('/test', (req, res) => {
    res.json({
        status: 200,
        msg: 'Good to go',
        data: []
    });
});

/* 
    @Route: GET /api/profile/handle/:handle
    @Desc: API to get profile by handle
    @Access: Public
    @Params: none
*/
router.get('handle/:handle', (req, res) => {
    const handle = req.params.handle;
    const errors = {};
    Profile.findOne({ handle: handle }).populate('user', ['name', 'avatar']).then(profile => {
        errors.profile = 'There is no profile for this user';
        if (!profile) return res.status(404).json({ status: 404, msg: 'There is no profile for this user', errors });

        res.json({ status: 200, msg: 'User profile', data: [profile]});
    }).catch(err => {
        errors = err;
        res.status(404).json({ status: 404, msg: 'Error!', errors});
    });
});


/* 
    @Route: GET /api/profile/user/:user_id
    @Desc: API to get profile by user_id
    @Access: Public
    @Params: none
*/
router.get('/user/:user_id', (req, res) => {
    console.log(req.params);
    const userId = req.params.user_id;
    const errors = {};
    Profile.findOne({ user: userId }).populate('user', ['name', 'avatar']).then(profile => {
        errors.profile = 'There is no profile for this user';
        if (!profile) return res.status(404).json({ status: 404, msg: 'There is no profile for this user', errors });

        res.json({ status: 200, msg: 'User profile', data: [profile]});
    }).catch(err => {
        errors = err;
        res.status(404).json({ status: 404, msg: 'Error!', errors});
    });
});


/* 
    @Route: GET /api/profile
    @Desc: API to get current user's profile
    @Access: Private
    @Params: none
*/
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const userId = req.user.id;
    const errors = {};
    Profile.findOne({ user: userId }).populate('user', ['name', 'avatar']).then(profile => {
        errors.profile = 'There is no profile for this user';
        if (!profile) return res.status(404).json({ status: 404, msg: 'There is no profile for this user', errors });

        res.json({ status: 200, msg: 'User profile', data: [profile]});
    }).catch(err => {
        errors = err;
        res.status(404).json({ status: 404, msg: 'Error!', errors});
    });
});


/* 
    @Route: POST /api/profile
    @Desc: API to create/edit user's profile
    @Access: Private
    @Params: none
*/
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Check that all required fields are filled out
    const { errors, isValid } = validateProfileInput(req.body);
    // Get all the fields supplied by the user
    const profileFields = {};
    const userId = req.user.id;
    profileFields.user = userId;

    // check validation
    if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json({ status: 400, msg: 'Validation Error!', errors });
    }

    if (req.body.handle) profileFields.handle = req.body.handle; 
    if (req.body.company) profileFields.company = req.body.company; 
    if (req.body.website) profileFields.website = req.body.website; 
    if (req.body.location) profileFields.location = req.body.location; 
    if (req.body.bio) profileFields.bio = req.body.bio; 
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubUsername) profileFields.githubUsername = req.body.githubUsername;
    // Skills is coming in as a string of CSV. Hence split into an array
    if(typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }
    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: userId }).then(profile => {
        if (profile) {
            // This is an update
            Profile.findOneAndUpdate({ user: userId }, { $set: profileFields }, { new: true }).then(update => {
                res.json({ status: 200, msg: 'User profile', data: [update]});
            });
        } else {
            // This is a create
            // Check if handle exists
            Profile.findOne({ handle: profileFields.handle }).then(foundHandle => {
                errors.handle = 'This handle already exists';
                if (foundHandle) res.status(400).json({ status: 400, msg: 'TThis handle already exists', errors });

                // Save Profile
                new Profile(profileFields).save().then(create => {
                    res.json({ status: 200, msg: 'User profile', data: [create]});
                }).catch(err => {
                    errors = err;
                    res.status(404).json({ status: 404, msg: 'Error!', errors});
                });
            }).catch(err => {
                errors = err;
                res.status(404).json({ status: 404, msg: 'Error!', errors});
            });
        }
    }).catch(err => {
        errors = err;
        res.status(404).json({ status: 404, msg: 'Error!', errors})
    });    
});


module.exports = router;