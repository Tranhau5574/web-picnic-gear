// Cart.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Link } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    async function fetchCart() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/user/cart", {
          headers: {
            "Auth-token": token,
          },
        });
        const cartObject = response.data.reduce((acc, item) => {
          acc[item._id] = item;
          return acc;
        }, {});
        setCartItems(cartObject);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    }
    fetchCart();
  }, []);

  const handleQuantityChange = (itemId, newQuantity) => {
    // Kiểm tra nếu số lượng mới là 0 hoặc rỗng, đặt giá trị mặc định là 1
    const quantity = parseInt(newQuantity, 10) || 1;
    
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [itemId]: { ...prevCartItems[itemId], quantity },
    }));
  };

  const calculateTotalAmount = () => {
    return Object.values(cartItems).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div>
      <Header />
      <h1><b>Cart: </b></h1>
      {Object.values(cartItems).map((item) => (
        <div key={item._id} className="item">
          <div className="item-image-container">
            <img className="img" src={item.image} alt={item.name} />
          </div>
          <div className="item-info">
            <Link to={`/item/${item._id}`} className="link-style">
              <h2>{item.name}</h2>
            </Link>
            <p className="price">{item.price.toLocaleString()}đ</p>
            <label>Quantity:</label>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(item._id, e.target.value)}
            />
            <p>Total: {(item.price * item.quantity).toLocaleString()}đ</p>
          </div>
        </div>
      ))}
      
      <h3>Total Amount to Pay: {calculateTotalAmount().toLocaleString()}đ</h3>
      <li className="pay">
        <Link to="/" className="header-button">
          Thanh toán
        </Link>
      </li>
      <Footer />
    </div>
  );
}

export default Cart;
