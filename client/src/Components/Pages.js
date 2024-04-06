import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from '../Components/Login/Login';
import Signup from '../Components/Signup/Signup';
import Product from '../Components/Product/Product';
import ProductDetails from '../Components/Product/ProductDetail';
import Cart from '../Components/Cart/Cart';
import Search from '../Components/Search/Search';
import AddProduct from './AddProduct/AddProduct';
import EditProduct from './editProduct/editProduct';
import OrderList from './ListOrder/ListOrder';

function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Product />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/search-result" element={<Search/>} />
      <Route path="/addProduct" element={<AddProduct />} />
      <Route path="/editProduct/:id" element={<EditProduct />} />
      <Route path="/listOrder" element={<OrderList />} />
    </Routes>
  );
}

export default Pages;
