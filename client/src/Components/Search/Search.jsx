// SearchResult.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import "./Search.css";

function Search() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("query");

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const searchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/product/search/${searchTerm}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    if (searchTerm) {
      searchProducts();
    }
  }, [searchTerm]);
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
    <div >
      <Header />
      <h1>Search Results for: {searchTerm}</h1>
      <div className="searchProducts">
        
        {searchResults.map((product) => (
          <div key={product._id} className="searchProduct">
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

export default Search;
