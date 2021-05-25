const express = require("express");
const route = express.Router();

const prodController = require('../controllers/product_funcs');
const userController = require('../controllers/user_funcs');
const { isProductofUser } = require('./helper_funcs');

//GET
route.get('/', (req, res) => {
    prodController.getAll().then((data) => {
        res.json(data);
    });
});

route.get('/myproducts', (req, res) => {
    userController.getUserByEmail(req.user.email).then((user) => {
        if (!user)
            return res.json({ "ERROR": "User does not exist." });
        else
            return res.json(user.products);
    });
});

route.get('/cart', (req, res) => {
    userController.getUserByEmail(req.user.email).then((user) => {
        if (!user)
            return res.json({ "ERROR": "User does not exist." });
        else
            return res.json(user.cart);
    });
});

route.get('/:id', (req, res) => {
    prodController.getById(req.params.id).then((product) => {
        if (!product)
            return res.json({ "ERROR": "Product does not exist." });
        else
            return res.json(product);
    });
});


//POST
route.post('/', (req, res) => {
    prodController.addProduct(req.user.email, req.body).then((product) => {
        userController.addProduct(req.body.email, product).then(() => {
            return res.redirect('/user');
        });
    });
});

route.post('/cart/:id', async (req, res) => {
    await prodController.getById(req.params.id).then((product) => {
        userController.getUserByEmail(req.user.email).then((user) => {
            if (!user.cart)
                for (let i = 0; i < user.cart.length; i++) {
                    if (product._id == user.cart[i]._id)
                        return res.redirect('/user');
                }
            userController.addToCart(req.user.email, product).then(() => {
                return res.redirect('/user');
            });
        });
    });
});

route.post('/:id', async (req, res) => {
    if (isProductofUser(req.user.email, req.params.id)) {
        req.body.email = req.user.email;
        const product = await prodController.updateById(req.params.id, req.body);
        await userController.updateProduct(req.user.email, req.params.id, product).then(() => {
            return res.redirect('/products/' + req.params.id);
        });
    }
});


///DELETE
route.delete('/:id', (req, res) => {
    if (isProductofUser(req.user.email, req.params.id)) {
        prodController.remove(req.params.id);
        userController.removeProduct(req.user.email, req.params.id);
        userController.getAllUsers().then((users) => {
            for (let i = 0; i < users.length; i++) {
                for (let j = 0; j < users[i].cart.length; j++) {
                    if (users[i].cart[j]._id == req.params.id) {
                        userController.removeFromCart(users[i].email, req.params.id);
                    }
                }
            }
        });
    }
    return res.send();
});

route.delete('/cart/:id', (req, res) => {
    if (isProductofUser(req.user.email, req.params.id)) {
        userController.removeFromCart(req.user.email, req.params.id);
    }
    return res.send();
});

module.exports = { route };