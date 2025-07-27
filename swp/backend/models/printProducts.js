const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: false },
    stock: { type: Number, required: true }
});

module.exports = mongoose.model('PrintProducts', productsSchema, 'PrintProducts');