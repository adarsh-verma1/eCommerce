const mongoose = require("mongoose");
const User = mongoose.model(require('../model/user_model').model_name);
const Product = mongoose.model(require('../model/product_model').model_name);

//Get items in the Cart
exports.getCart = async function (email) {
    const user = await User.findOne({ email }).exec();
    let cartProducts = [];
    for (let i = 0; i < user.cart.length; i++) {
        const product = await Product.findById(user.cart[i]);
        if (product)
            cartProducts.push(product);
    }
    return cartProducts;
}

//Add item to the Cart
exports.addToCart = async function (email, productID) {
    const user = await User.findOne({ email }).exec();
    user.cart.push(productID);
    return user.save();
}

//Remove item from the Cart
exports.removeFromCart = async function (email, productID) {
    const user = await User.findOne({ email }).exec();
    for (let i = 0; i < user.cart.length; i++) {
        if (user.cart[i] == productID) {
            user.cart.splice(i, 1);
            break;
        }
    }
    return user.save();
}

