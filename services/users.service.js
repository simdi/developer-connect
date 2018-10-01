/* 
    @Author: Chisimdi Damian Ezeanieto
    @Date: 30/10/2018
*/
const express = require('express');
const path = require('path');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
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
    const email = typeof(req.body.email) === 'string' && req.body.email.trim().length > 0 ? req.body.email.trim() : false;
    const name = typeof(req.body.name) == 'string' && req.body.name.trim().length > 0 ? req.body.name.trim() : false;
    const phone = typeof(req.body.phone) == 'string' && req.body.phone.trim().length > 10 ? req.body.phone.trim() : false;
    const password = typeof(req.body.password) == 'string' && req.body.password.trim().length > 0 ? req.body.password.trim() : false;
    const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm'}); // s: Size, r: Rating, d: Default

    if (name && email && phone && password) {
        User.findOne({ email }).then(user => {
            if (user) {
                return res.status(400).json({ status: 400, msg: 'Email already exists!'});
            } else {
                const newUser = new User({ name, phone, email, avatar, password });
                // Encrypt the password before saving
                bcrypt.genSalt(10, (err, salt) => {
                    if(err) throw err;
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save().then(user => {
                            res.json(user);
                        }).catch(e => console.log(`Error saving user ${e}`));
                    });
                });
            }
        });
    } else {
        return res.status(400).json({ status: 400, msg: 'Missing argument!'});
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
    const email = typeof(req.body.email) === 'string' && req.body.email.trim().length > 0 ? req.body.email.trim() : false;
    const password = typeof(req.body.password) == 'string' && req.body.password.trim().length > 0 ? req.body.password.trim() : false;

    if (email && password) {
        User.findOne({ email }).then(user => {
            if (!user) return res.status(400).json({ status: 400, msg: 'User not found'});

            // compare password
            bcrypt.compare(password, user.password).then();

        });
    } else {
        return res.status(400).json({ status: 400, msg: 'Missing argument!'});
    }
});

module.exports = router;