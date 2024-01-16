const express = require('express');
const Router = express.Router();
const ProductCtrl = require('../Controller/ProductCtrl');
const Auth = require('../Middlewares/Auth');

Router.post('/add',Auth, ProductCtrl.addProduct);
// Router.put('/edit/:id', ProductCtrl.editProduct);
// Router.delete('/delete/:id', ProductCtrl.deleteProduct);
Router.get('/view/:id', ProductCtrl.viewProduct);
Router.get('/', ProductCtrl.getAllProducts);
Router.get('/search/:name', ProductCtrl.searchProducts);

module.exports = Router;