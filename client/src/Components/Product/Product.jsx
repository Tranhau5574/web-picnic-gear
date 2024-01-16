import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Product.css";
import Header from '../Header/Header';
import Footer from "../Footer/Footer";

function Product() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      const response = await axios.get("http://localhost:5000/product");
      setProducts(response.data);
    }

    fetchProducts();
  }, []);

  async function addToCart(productId) {
    const token = localStorage.getItem("token");
    if (!token) {
      // Navigate to login if not authenticated
      // Replace this with your actual navigation logic
      alert("Please login first");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/user/cart",
        {
          productId: productId,
        },
        {
          headers: {
            "Auth-Token": token,
          },
        }
      );

      if (response.data.success) {
        alert("Product added to cart successfully");
      } else {
        alert("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("An error occurred while adding to cart");
    }
  }

  return (
    <div>
       <Header />
    <div className="products">
     
      {products.map((product) => (
        <div key={product._id} className="product" >
          <img src={product.image} alt={product.name} />

          <Link to={`/product/${product._id}`} className="link-style">
            <h2>{product.name}</h2>
          </Link>
          <p className="price">{product.price.toLocaleString()}đ</p>
          <button onClick={() => addToCart(product._id)}>Add to Cart</button>
        </div>
      ))}
    </div>
     <Footer />
    </div>
  );
}

export default Product;
