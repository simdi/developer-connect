/* 
    @Author: Chisimdi Damian Ezeanieto
    @Date: 30/10/2018
*/

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/default');
const mongoose = require('mongoose');
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Use routes
app.use('/api/users', routes.users);
app.use('/api/profiles', routes.profiles);
app.use('/api/posts', routes.posts);

app.listen(port, _ => {
    console.log(`Server is running on port ${port}`);
});