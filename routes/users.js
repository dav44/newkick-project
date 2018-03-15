const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config =require('../config/database');
const User = require('../models/user');
 

router.post('/sign-up', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });
    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, message: 'failed to sign up user'});
        }   else {
            res.json({success: true, message: 'user signed up'});
        }
    });
});


router.post('/authenticate', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    
    User.getUserByEmail(email, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({success: false, message: 'wrong email'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user: {
                        name: user.name,
                        lastName: user.lastName
                    }
                });
            } else {
                return res.json({success: false, message: 'wrong password'});
            }
        });
    });

});


router.get('/userpage', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

module.exports = router;