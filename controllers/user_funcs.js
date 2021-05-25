const mongoose = require("mongoose");
const User = mongoose.model(require('../model/user_model').model_name);

exports.addUser = function (obj) {
    const newUser = new User(obj);
    return newUser.save();
}

exports.addProduct = async function (email, obj) {
    let user = await User.findOne({ email: email }).exec();
    user.products.push(obj);
    return user.save();
}

exports.getUserByEmail = function (email) {
    return User.findOne({ email }).exec();
}

exports.getAllUsers = function () {
    return User.find({}).exec();
}

exports.updateProduct = async function (email, productID, product) {
    const user = await User.findOne({ email }).exec();
    for (let i = 0; i < user.products.length; i++) {
        if (user.products[i]._id == productID) {
            user.products[i] = product;
            return user.save();
        }
    }
}

exports.removeProduct = async function (email, productID) {
    const user = await User.findOne({ email }).exec();
    for (let i = 0; i < user.products.length; i++) {
        if (user.products[i]._id == productID) {
            user.products.splice(i, 1);
            return user.save();
        }
    }
}

exports.addToCart = async function (email, product) {
    const user = await User.findOne({ email }).exec();
    user.cart.push(product);
    return user.save();
}

exports.removeFromCart = async function (email, productID) {
    const user = await User.findOne({ email }).exec();
    for (let i = 0; i < user.cart.length; i++) {
        if (user.cart[i]._id == productID) {
            user.cart.splice(i, 1);
            return user.save();
        }
    }
}
