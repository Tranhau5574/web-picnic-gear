import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from '../Components/Login/Login';
import Signup from '../Components/Signup/Signup';
import Product from '../Components/Product/Product';
import ProductDetails from '../Components/Product/ProductDetail';
import Cart from '../Components/Cart/Cart';
import Search from '../Components/Search/Search';

function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Product />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/search-result" element={<Search/>} />
    </Routes>
  );
}

export default Pages;
