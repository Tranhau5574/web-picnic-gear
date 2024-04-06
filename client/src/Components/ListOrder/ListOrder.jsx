import React, { useEffect, useState } from "react";

import axios from "axios";

function ListOrder() {
  const token = localStorage.getItem("token");

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/purchase/view", {
          headers: {
            "Auth-Token": token,
          },
        });
        setOrders(res.data);
      } catch (error) {
        console.error("Fetch orders error:", error);
      }
    };
    fetchOrders();
  }, [token]);

  const calculateTotalAmount = (order) => {
    return order.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  return (
    <div>
      {orders.map((order) => (
        <div key={order._id}>
          <h2>User: {order.infor.username}</h2>
          {order.cartItems && order.cartItems.map((item) => (
            <div key={item._id}>
              <img src={item.image} alt={item.name} />
              <h2>{item.name}</h2>
            </div>
          ))}
          <p>Total: {calculateTotalAmount(order).toLocaleString()}đ</p>
        </div>
      ))}
    </div>
  );
  
}

export default ListOrder;