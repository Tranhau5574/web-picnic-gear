import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import "./ProductDetail.css"

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      const response = await axios.get(
        `http://localhost:5000/product/view/${id}`
      );
      setProduct(response.data);
    }

    fetchProduct();
  }, [id]);
  async function addToCart() {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/user/cart",
          {
            productId: id,
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
  }

  if (!product) return "Loading....";

  return (
    <div>
      <Header />
      <div className="product-details">
            <div className="product-image">
                <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
                <h2>{product.name}</h2>
                <p className="product-description">{product.description}</p>
                <p className="product-price">{product.price.toLocaleString()}đ</p>
                <button onClick={() => addToCart(product._id)}>Add to Cart</button>
            </div>
        </div>
        <Footer />
    </div>
  );
}

export default ProductDetails;
