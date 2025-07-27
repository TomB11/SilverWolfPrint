const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb+srv://tbaranek82:rmjk6QEFKW73Of3M@training.w2gml.mongodb.net/SWP?retryWrites=true&w=majority&appName=Training')
.then(() => {
    console.log('Connection ok')
})
.catch(() => {
    console.log('Connection ERROR')
})

app.use((req, res, next) => {{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    }}
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PrintProducts = require('./models/printProducts');

app.get('/api/printProducts',(req, res, next) => {
    PrintProducts.find({}).then((data) => {
        console.log('Fetched products:', data);
        res.status(200).json({
            message: 'Products fetched successfully',
            products: data
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Fetching products failed',
            error: error
        });
    });
});

module.exports = app;