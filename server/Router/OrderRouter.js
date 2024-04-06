const express = require('express');
const Router = express.Router();
const OrderCtrl = require('../Controller/OrderCtrl');
const Auth = require('../Middlewares/Auth');
const AuthAdmin = require('../Middlewares/AuthAdmin');

Router.get('/view',Auth, AuthAdmin, OrderCtrl.getAllOrders); 
Router.post('/add',Auth, OrderCtrl.addOrder);
Router.get('view-order', Auth, OrderCtrl.viewOrderByUserId);
Router.put("updata-status",Auth, AuthAdmin, OrderCtrl.updateOrderStatus)

module.exports = Router;
