const express = require("express");
const route = express.Router();
const path = require('path');

const prodController = require('../controllers/product_funcs');
const userController = require('../controllers/user_funcs');
const cartController = require('../controllers/cart_funcs');
const { isProductofUser } = require('./helper_funcs');

//Fetching the cart page for /cart route
route.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/html/cart.html'));
});

//To get the list of products in the cart of the current user
route.get('/items', async (req, res) => {
    let cartProducts = await cartController.getCart(req.user.email);
    return res.json(cartProducts);
});

//To add a product id in cart of the current user, only if it is not present already
route.post('/:id', (req, res) => {
    prodController.getById(req.params.id).then((product) => {
        userController.getUserByEmail(req.user.email).then((user) => {
            if (user.cart) {
                for (let i = 0; i < user.cart.length; i++) {
                    if (user.cart[i] == req.params.id)
                        return res.redirect('/user');
                }
            }
            cartController.addToCart(user.email, product._id).then(() => {
                return res.redirect('/user');
            });
        });
    });
});

//To delete a product by id from the cart of the current user
route.delete('/:id', (req, res) => {
    if (isProductofUser(req.user.email, req.params.id)) {
        cartController.removeFromCart(req.user.email, req.params.id);
    }
    return res.send();
});

module.exports = { route };
