const passport = require("passport");
const route = require("express").Router();
const path = require('path');
const userController = require('../controllers/user_funcs');

const { isAuthenticated, isNotAuthenticated } = require('./helper_funcs');

route.use('/user', isAuthenticated, require('./user_route').route);

route.use('/products', isAuthenticated, require('./product_route').route);

route.get('/login', isNotAuthenticated, (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/html/login.html'));
});

route.get('/register', isNotAuthenticated, (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/html/register.html'));
});

route.get('/home', isAuthenticated, (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/html/home.html'));
});

route.post('/login', passport.authenticate('local', {
    successRedirect: "/user",                       // Logged In and redirected to the User Home Page
    failureRedirect: "/login",                      // Not Logged In and redirected to the Login Page
}));

route.post('/register', (req, res) => {
    if (req.body.password !== req.body.confirmPassword) {
        return res.send(" ERROR : Passwords do not match.");
    }

    userController.addUser(req.body).then(() => {
        return res.redirect('/login')
    }).catch((err) => res.send(" ERROR : User already exists."));
});

module.exports = { route };