const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');
const Project = require('../models/project');

module.exports = function(passport){
    let opts ={};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey =config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.getUserById(jwt_payload._id, (err, user) => {
            if(err) {
                return done(err, false);
            }
            if(user) {
                return done(null, user);
            }   else {
                return done(null, false);
            }
        });
        Project.getProjectById(jwt_payload._id, (err, project) => {
            if(err) {
                return done(err, false);
            }
            if(project) {
                return done(null, project);
            }   else {
                return done(null, false);
            }
        })
    }));
}