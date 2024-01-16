const express = require('express');
const Router = express.Router();
const UserCtrl = require('../Controller/UserCtrl');
const auth = require('../Middlewares/Auth');

Router.post('/login', UserCtrl.login);
// Router.route('/login')
// .post(UserCtrl.login);
Router.get('/logout', UserCtrl.logout);
Router.post('/signup', UserCtrl.signup);
Router.post('/cart',auth, UserCtrl.addToCart);
Router.get('/cart', auth, UserCtrl.getCart);

module.exports = Router;