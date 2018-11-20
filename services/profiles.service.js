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
const validateExperienceInput = require('../validation/experience');
const validateEducationInput = require('../validation/education');
const router = express.Router();

/* 
    @Route: GET /api/profile/:handle
    @Desc: API to get profile by handle
    @Access: Public
    @Params: none
*/
router.get('/handle/:handle', (req, res) => {
    const handle = req.params.handle;
    let errors = {};
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
    const userId = req.params.user_id;
    let errors = {};
    Profile.findOne({ user: userId }).populate('user', ['name', 'avatar']).then(profile => {
        errors.profile = 'There is no profile for this user';
        if (!profile) return res.status(404).json({ status: 404, msg: 'There is no profile for this user', errors });

        res.json({ status: 200, msg: 'User profile', data: [profile]});
    }).catch(err => {
        errors.profile = 'There is no profile for this user';
        res.status(404).json({ status: 404, msg: 'Error!', errors});
    });
});


/* 
    @Route: GET /api/profile/all
    @Desc: API to get all profiles
    @Access: Public
    @Params: none
*/
router.get('/all', (req, res) => {
    let errors = {};
    Profile.find().populate('user', ['name', 'avatar']).then(profiles => {
        errors.profiles = 'There are no profiles';
        if (!profiles) return res.status(404).json({ status: 404, msg: 'Error!', errors });

        res.json({ status: 200, msg: 'User profiles', data: profiles});
    }).catch(err => {
        errors.profile = 'There are no profiles';
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
    let errors = {};
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
    let { errors, isValid } = validateProfileInput(req.body);
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
                if (foundHandle) return res.status(400).json({ status: 400, msg: 'This handle already exists', errors });

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


/* 
    @Route: POST /api/profile/experience
    @Desc: API to add profile
    @Access: Private
    @Params: none
*/
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Check that all required fields are filled out
    let { errors, isValid } = validateExperienceInput(req.body);
    // check validation
    if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json({ status: 400, msg: 'Validation Error!', errors });
    }

    const userId = req.user.id;
    Profile.findOne({ user: userId }).then(profile => {
        const newExperience = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        };

        // Add to experience Array
        profile.experience.unshift(newExperience);

        profile.save().then(profile => {
            res.json({ status: 200, msg: 'Experience has been added to profile', data: [profile]});
        }).catch(err => {
            errors = err;
            res.status(404).json({ status: 404, msg: 'Error!', errors});
        });
    }).catch(err => {
        errors = err;
        res.status(404).json({ status: 404, msg: 'Error!', errors})
    });    
});


/* 
    @Route: POST /api/profile/education
    @Desc: API to add education
    @Access: Private
    @Params: none
*/
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Check that all required fields are filled out
    let { errors, isValid } = validateEducationInput(req.body);
    // check validation
    if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json({ status: 400, msg: 'Validation Error!', errors });
    }

    const userId = req.user.id;
    Profile.findOne({ user: userId }).then(profile => {
        const newEducation = {
            school: req.body.school,
            degree: req.body.degree,
            fieldOfStudy: req.body.fieldOfStudy,
            from: req.body.from,
            to: req.body.to,
            location: req.body.location,
            current: req.body.current,
            description: req.body.description
        };

        // Add to education Array
        profile.education.unshift(newEducation);

        profile.save().then(profile => {
            res.json({ status: 200, msg: 'Education has been added to profile', data: [profile]});
        }).catch(err => {
            errors = err;
            res.status(404).json({ status: 404, msg: 'Error!', errors});
        });
    }).catch(err => {
        errors = err;
        res.status(404).json({ status: 404, msg: 'Error!', errors})
    });    
});


/* 
    @Route: DELETE /api/profile/experience/:exp_id
    @Desc: API to delete experience from profile
    @Access: Private
    @Params: none
*/
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const userId = req.user.id;
    const expId = req.params.exp_id;
    Profile.findOne({ user: userId }).then(profile => {
        // Get index of item to delete
        const removeIndex = profile.experience.map(x => x.id).indexOf(expId);
        // Splice out of array.
        profile.experience.splice(removeIndex, 1);

        profile.save().then(profile => {
            res.json({ status: 200, msg: 'Education has been deleted from profile', data: [profile]});
        }).catch(err => {
            errors = err;
            res.status(404).json({ status: 404, msg: 'Error!', errors});
        });
    }).catch(err => {
        errors = err;
        res.status(404).json({ status: 404, msg: 'Error!', errors})
    });    
});


/* 
    @Route: DELETE /api/profile/education/:exp_id
    @Desc: API to delete education from profile
    @Access: Private
    @Params: none
*/
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const userId = req.user.id;
    const expId = req.params.edu_id;
    Profile.findOne({ user: userId }).then(profile => {
        // Get index of item to delete
        const removeIndex = profile.education.map(x => x.id).indexOf(expId);
        // Splice out of array.
        profile.education.splice(removeIndex, 1);

        profile.save().then(profile => {
            res.json({ status: 200, msg: 'Education has been deleted from profile', data: [profile]});
        }).catch(err => {
            errors = err;
            res.status(404).json({ status: 404, msg: 'Error!', errors});
        });
    }).catch(err => {
        errors = err;
        res.status(404).json({ status: 404, msg: 'Error!', errors})
    });    
});


/* 
    @Route: DELETE /api/profile
    @Desc: API to delete user and profile
    @Access: Private
    @Params: none
*/
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const userId = req.user.id;
    const expId = req.params.edu_id;
    Profile.findOneAndRemove({ user: userId }).then(profile => {
        User.findOneAndRemove({ _id: userId }).then(user => {
            res.json({ status: 200, msg: 'User and Profile has been deleted successfully.', data: []});
        })
    }).catch(err => {
        errors = err;
        res.status(404).json({ status: 404, msg: 'Error!', errors})
    });    
});


module.exports = router;