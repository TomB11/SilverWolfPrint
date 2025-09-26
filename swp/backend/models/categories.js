const mongoose = require('mongoose');

const categoriesSchema = mongoose.Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true }
})

module.exports = mongoose.model('Categories', categoriesSchema, 'Categories');