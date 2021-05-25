const prodController = require('../controllers/product_funcs');
const userController = require('../controllers/user_funcs');

exports.isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();

    return res.send(" ERROR : You need to Log In first.");
}

exports.isNotAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return res.redirect("/user");

    return next();
}

exports.isProductofUser = async function (email, productID) {
    await userController.getUserByEmail(email).then((user) => {
        for (let i = 0; i < user.products.length; i++) {
            if (user.products[i]._id == productID)
                return true;
        }
    });
    return false;
}