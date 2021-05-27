const mongoose = require("mongoose");
const User = mongoose.model(require('../model/user_model').model_name);

//Add a new User to the Database
exports.addUser = function (obj) {
    const newUser = new User(obj);
    return newUser.save();
}

//Add product by the User
exports.addProduct = async function (email, obj) {
    let user = await User.findOne({ email: email }).exec();
    user.products.push(obj);
    return user.save();
}

//Get a unique user by the email
exports.getUserByEmail = function (email) {
    return User.findOne({ email }).exec();
}

//Get the list of All Users
exports.getAllUsers = function () {
    return User.find({}).exec();
}

//Update Product added by the User
exports.updateProduct = async function (email, productID, product) {
    const user = await User.findOne({ email }).exec();
    for (let i = 0; i < user.products.length; i++) {
        if (user.products[i]._id == productID) {
            user.products[i] = product;
            return user.save();
        }
    }
}

//Remove Product added by the User
exports.removeProduct = async function (email, productID) {
    const user = await User.findOne({ email }).exec();
    for (let i = 0; i < user.products.length; i++) {
        if (user.products[i]._id == productID) {
            user.products.splice(i, 1);
            return user.save();
        }
    }
}

