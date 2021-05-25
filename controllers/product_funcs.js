const mongoose = require("mongoose");
const product = mongoose.model(require('../model/product_model').model_name);

exports.addProduct = function (email, obj) {
    obj.email = email;
    const newProduct = new product(obj);
    return newProduct.save();
}

exports.getAll = function () {
    return product.find({}).exec();
}

exports.getById = function (id) {
    return product.findById(id).exec();
}

exports.updateById = function (id, updatedProduct) {
    return product.findByIdAndUpdate(id, updatedProduct, { new: true }).exec();
}

exports.remove = function (id) {
    return product.findByIdAndDelete(id).exec();
}