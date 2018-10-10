/* 
    @Author: Chisimdi Damian Ezeanieto
    @Date: 30/10/2018
*/

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/default');
const mongoose = require('mongoose');
const passport = require('passport');
const routes = require('./services');
const app = express();
const port = process.env.PORT || config.port;

// DB Configuration
const db = config.mongodb;
mongoose.connect(db, {
    useNewUrlParser: true
}).then(connection => {
    console.log(`MongoDB connected successfully.`);
}).catch(err => {
    console.log(`Couldn't connect to mongoDB. Here is the error`, err);
});

// Load app configurations
// app.configure(configuration);

// Middlewares
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport configuration
require('./config/passport')(passport);

// Use routes
app.get('/', (req, res) => {
    const json = { "name": "Chisimdi" };
    debugger;
    res.status(200).json(json);
});
app.use('/api/users', routes.users);
app.use('/api/profiles', routes.profiles);
app.use('/api/posts', routes.posts);

app.listen(port, _ => {
    console.log(`Server is running on port ${port}`);
});