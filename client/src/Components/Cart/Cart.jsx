import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
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
          acc[item._id] = { ...item, quantity: 1 };
          return acc;
        }, {});
        setCartItems(cartObject);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }
    fetchCart();
  }, []);

  const handleQuantityChange = (itemId, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);
    if (isNaN(quantity)) {
      newQuantity = 1;
    }
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

  const HandleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/user/infor", {
        headers: { "Auth-Token": token },
      });

      const response = await axios.post(
        "http://localhost:5000/purchase/add",
        { userId: res.data, cartItems: Object.values(cartItems) },
        { headers: { "Auth-Token": token } }
      );

      if (response.data.success) {
        alert("Order successfully placed!");
        await axios.delete("http://localhost:5000/user/deleteAllCart", {
          headers: { "Auth-Token": token },
        });
        navigate("/login");

        window.location.reload();
      } else {
        alert("Failed to place order");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while placing the order");
    }
  };

  return (
    <div>
      <Header />
      <h1>
        <b>Cart: </b>
      </h1>
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
        <button onClick={HandleCheckout}>Thanh toán</button>
      </li>
      <Footer />
    </div>
  );
}

export default Cart;
