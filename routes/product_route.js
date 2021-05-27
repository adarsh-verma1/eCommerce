const express = require("express");
const route = express.Router();

const prodController = require('../controllers/product_funcs');
const userController = require('../controllers/user_funcs');
const { isProductofUser } = require('./helper_funcs');

//To get the list of all products
route.get('/', (req, res) => {
    prodController.getAll().then((data) => {
        res.json(data);
    });
});

//To get the list of products added by the current user
route.get('/myproducts', (req, res) => {
    userController.getUserByEmail(req.user.email).then((user) => {
        if (!user)
            return res.json({ "ERROR": "User does not exist." });
        else
            return res.json(user.products);
    });
});

//To get a product by id
route.get('/:id', (req, res) => {
    prodController.getById(req.params.id).then((product) => {
        if (!product)
            return res.json({ "ERROR": "Product does not exist." });
        else
            return res.json(product);
    });
});

//To add a product by the current user
route.post('/', (req, res) => {
    prodController.addProduct(req.user.email, req.body).then((product) => {
        userController.addProduct(req.body.email, product).then(() => {
            return res.redirect('/user');
        });
    });
});

//To update a product using the id
route.post('/:id', async (req, res) => {
    if (isProductofUser(req.user.email, req.params.id)) {
        req.body.email = req.user.email;
        const product = await prodController.updateById(req.params.id, req.body);
        await userController.updateProduct(req.user.email, req.params.id, product).then(() => {
            return res.redirect('/products/' + req.params.id);
        });
    }
});

//To delete a product using the id
route.delete('/:id', (req, res) => {
    if (isProductofUser(req.user.email, req.params.id)) {
        prodController.remove(req.params.id);
        userController.removeProduct(req.user.email, req.params.id);
    }
    return res.send();
});

module.exports = { route };