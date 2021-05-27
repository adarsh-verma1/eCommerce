const mongoose = require("mongoose");

const model_name = "product";

const productSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    manufactured_by: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model(model_name, productSchema);
module.exports = { model_name, productSchema };
