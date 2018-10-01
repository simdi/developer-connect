const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const secret = require('./default').authentication.secret;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwtPayload, done ) => {
        console.log('JWT Payload', jwtPayload);
    }));
}