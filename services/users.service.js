/* 
    @Author: Chisimdi Damian Ezeanieto
    @Date: 30/10/2018
*/
const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const config = require('../config/default');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const validateRegisterInput = require('../validation/registration');
const validateLoginInput = require('../validation/login');
const router = express.Router();
const User = require(path.join(__dirname, '../models/User.model'));

/* 
    @Route: GET /api/users
    @Desc: Get all users route.
    @Access: Public 
*/
router.get('/', (req, res) => {
    res.json({
        status: 200,
        msg: 'Good to go',
        data: []
    });
});

/* 
    @Route: POST /api/users/register
    @Desc: API to register users
    @Access: Public
    @Params: name, email, password, phone, and avatar
*/
router.post('/register', (req, res) => {
    // Check that all required fields are filled out
    const { errors, isValid } = validateRegisterInput(req.body);
    const email = req.body.email;
    const name = req.body.name;
    const phone = req.body.phone;
    const password = req.body.password;
    const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm'}); // s: Size, r: Rating, d: Default

    if (isValid) {
        User.findOne({ email }).then(user => {
            if (user) {
                errors.email = 'Email already exists!';
                return res.status(400).json({ status: 400, msg: 'Email already exists!', errors});
            } else {
                const newUser = new User({ name, phone, email, avatar, password });
                // Encrypt the password before saving
                bcrypt.genSalt(10, (err, salt) => {
                    if(err) throw err;
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save().then(user => {
                            res.json({ status: 200, msg: 'User has been created successfully.', data: [user]});
                        }).catch(e => console.log(`Error saving user ${e}`));
                    });
                });
            }
        });
    } else {
        return res.status(400).json({ status: 400, msg: 'Missing argument!', errors});
    }
});


/* 
    @Route: POST /api/users/login
    @Desc: API to login users and return JWT Token
    @Access: Public
    @Params: email, password
*/
router.post('/login', (req, res) => {
    // Check that all required fields are filled out
    const { errors, isValid } = validateLoginInput(req.body);
    const email = req.body.email;
    const password = req.body.password;

    if (isValid) {
        User.findOne({ email }).then(user => {
            if (!user) return res.status(400).json({ status: 400, msg: 'User not found'});

            // compare password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    // User match a record in the DB

                    // Create JWT payload
                    const payload = { id: user.id, name: user.name, avatar: user.avatar };
                    // Sign the token
                    jwt.sign(payload, config.authentication.secret, config.authentication.jwt, (err, token) => {
                        if (err) return res.status(400).json({ status: 400, msg: `Sorry! we couldn't log you in`});
                        res.status(200).json({ status: 200, msg: 'Success', token: `Bearer ${token}`});
                    });
                } else {
                    errors.email = 'Email or Password is incorrect';
                    return res.status(400).json({ status: 400, msg: 'Email or Password is incorrect!', errors});
                }
            });
        });
    } else {
        return res.status(400).json({ status: 400, msg: 'Validation Error!', errors});
    }
});

/* 
    @Route: POST /api/users/user
    @Desc: API to get current user and it data.
    @Access: Private
    @Params: Bearer Token
*/
router.get('/user', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { _id, email, name, phone } = req.user;
    res.json({ msg: 'success', data: [{ _id, email, name, phone }] });
});

module.exports = router;