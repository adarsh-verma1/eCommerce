const userController = require('../controllers/user_funcs');

//If user is authenticated, sending to next process else sending error message
exports.isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();

    return res.send(" ERROR : You need to Log In first.");
}

//If user is already authenticated, sending to home page else sending to next process
exports.isNotAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return res.redirect("/user");

    return next();
}

//To check if a product is added by the current user
exports.isProductofUser = async function (email, productID) {
    await userController.getUserByEmail(email).then((user) => {
        for (let i = 0; i < user.products.length; i++) {
            if (user.products[i]._id == productID)
                return true;
        }
    });
    return false;
}