const route = require("express").Router();
const path = require('path');

route.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/html/home.html'));
});

route.get('/info', (req, res) => {
    return res.json(req.user.name);
});

route.get('/logout', (req, res) => {
    req.logOut();
    return res.redirect('/login');
})

route.get('/add_product', (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/html/add_product.html'));
});

route.get('/edit_product/:id', (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/html/edit_product.html'));
});

route.get('/my_product', (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/html/my_product.html'));
});

route.get('/cart', (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/html/cart.html'));
});

module.exports = { route };