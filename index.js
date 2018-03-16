const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const users = require('./routes/users');
const projects = require('./routes/projects');
const config = require('./config/database');
const multer = require('multer');


const app = express();


mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('Connected to database');
});

mongoose.connection.on('error', (err) => {
    console.log('database error: '+err);
});


app.get('/', (req, res) => {
    res.send('endpoint');
});

app.use(express.static('./my-kickstarter/dist'));
app.use('/uploads', express.static('uploads'));


app.use(cors());

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/projects', projects);


app.listen(3000, () => {
    console.log('Server started on port 3000');
});