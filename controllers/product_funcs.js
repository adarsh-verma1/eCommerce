const mongoose = require("mongoose");
const product = mongoose.model(require('../model/product_model').model_name);

//Add a product 
exports.addProduct = function (email, obj) {
    obj.email = email;
    const newProduct = new product(obj);
    return newProduct.save();
}

//Fetch the list of all products
exports.getAll = function () {
    return product.find({}).exec();
}

//Fetch a particular product by id
exports.getById = function (id) {
    return product.findById(id).exec();
}

//Update a particular product by id
exports.updateById = function (id, updatedProduct) {
    return product.findByIdAndUpdate(id, updatedProduct, { new: true }).exec();
}

//Remove a particular product by id
exports.remove = function (id) {
    return product.findByIdAndDelete(id).exec();
}