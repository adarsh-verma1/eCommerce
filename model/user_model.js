const mongoose = require("mongoose");
const productSchema = require('./product_model').productSchema;
const model_name = "user";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    products: [productSchema],      //Contains the product itself
    cart: [String]                  //Contains the id of the product
});

mongoose.model(model_name, userSchema);
module.exports = { model_name };
