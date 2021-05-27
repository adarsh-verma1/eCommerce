const passport = require("passport");
const route = require("express").Router();
const path = require('path');
const userController = require('../controllers/user_funcs');

const { isAuthenticated, isNotAuthenticated } = require('./helper_funcs');

//If user is authenticated, then only redirecting to /user route
route.use('/user', isAuthenticated, require('./user_route').route);

//If user is authenticated, then only redirecting to /products route
route.use('/products', isAuthenticated, require('./product_route').route);

//If user is not authenticated, then only fetching the login page
route.get('/login', isNotAuthenticated, (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/html/login.html'));
});

//If user is not authenticated, then only fetching the register page
route.get('/register', isNotAuthenticated, (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/html/register.html'));
});

//If user is authenticated, then only fetching the home page
route.get('/home', isAuthenticated, (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/html/home.html'));
});

//POST Method to login page is verified by passport if the credentials are correct
route.post('/login', passport.authenticate('local', {
    successRedirect: "/user",                       // Logged In and redirected to the User Home Page
    failureRedirect: "/login",                      // Not Logged In and redirected to the Login Page
}));

//POST Method to register page is checked if passwords match, then only new User registered
route.post('/register', (req, res) => {
    if (req.body.password !== req.body.confirmPassword) {
        return res.send(" ERROR : Passwords do not match.");
    }

    userController.addUser(req.body).then(() => {
        return res.redirect('/login')
    }).catch((err) => res.send(" ERROR : User already exists."));
});

module.exports = { route };