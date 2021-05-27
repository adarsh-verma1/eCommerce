const route = require("express").Router();
const path = require('path');

//Redirecting any fuction of cart to /cart route
route.use('/cart', require('./cart_route').route);

//Fetching the home page for /user route
route.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/html/home.html'));
});

//Fetching the name of the user to display
route.get('/info', (req, res) => {
    return res.json(req.user.name);
});

//Log Out the current user
route.get('/logout', (req, res) => {
    req.logOut();
    return res.redirect('/login');
})

//Fetching the add product page
route.get('/add_product', (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/html/add_product.html'));
});

//Fetching the edit product page
route.get('/edit_product/:id', (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/html/edit_product.html'));
});

//Fetching the my product page
route.get('/my_product', (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/html/my_product.html'));
});

module.exports = { route };