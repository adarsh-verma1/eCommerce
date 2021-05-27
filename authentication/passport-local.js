const mongoose = require('mongoose');
const User = mongoose.model(require('../model/user_model').model_name);
const passport = require('passport');

//Using local strategy of passport through the passport-local
const LocalStrategy = require('passport-local').Strategy;

//Fields to be used to verify credentials 
const Fields = {
    usernameField: "email",
    passwordField: "password"
};

//Verifying the User credentials
passport.use(new LocalStrategy(Fields, (email, password, done) => {
    User.findOne({ email: email }).exec().then((user) => {
        if (!user || user.password !== password)
            return done(null, false);
        else
            return done(null, user);
    });
}));

//If the user is logging first time, create new cookies
passport.serializeUser((user, done) => {
    done(null, user._id);
});

//If the user is already logged in, fetch the same cookies
passport.deserializeUser((id, done) => {
    User.findById(id).exec().then((user) => {
        done(null, user);
    });
});