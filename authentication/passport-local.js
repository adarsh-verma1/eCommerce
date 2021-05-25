const mongoose = require('mongoose');
const User = mongoose.model(require('../model/user_model').model_name);

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Fields = {
    usernameField: "email",
    passwordField: "password"
};

passport.use(new LocalStrategy(Fields, (email, password, done) => {
    User.findOne({ email: email }).exec().then((user) => {
        if (!user || user.password !== password)
            return done(null, false);
        else
            return done(null, user);
    });
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).exec().then((user) => {
        done(null, user);
    });
});