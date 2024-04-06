import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Product.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Product() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(()=> {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
  },[navigate]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/product");
        setProducts(response.data);
      } catch (error) {
        console.error("Fetch products error:", error);
        // Nếu lỗi xảy ra và là lỗi invalid Authorization, chuyển hướng đến trang đăng nhập
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      }
    };
  
    // Kiểm tra token trước khi gửi yêu cầu đến server
    if (token) {
      fetchProducts();
    }
  }, [token, navigate]);
  const [tokenChecked, setTokenChecked] = useState(false);

useEffect(() => {
  if (token && !tokenChecked) {
    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/user/infor", {
          headers: {
            "Auth-Token": token,
          },
        });

        res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
        setTokenChecked(true); // Đánh dấu rằng token đã được kiểm tra
      } catch (err) {
        console.error("Get user info error:", err);
        alert(err.response.data.msg);
        navigate("/login");
      }
    };
    getUser();
  } else if (!token) {
    // Nếu không có token, chuyển hướng đến trang đăng nhập
    navigate("/login");
  }
}, [token, tokenChecked, navigate]);


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
  // async function editProduct(productId) {
  //   // Navigate to the edit product page
  //   // Replace this with your actual navigation logic

  //   window.location.href = `/editProduct/${productId}`;
  // }

  async function deleteProduct(productId) {
    const token = localStorage.getItem("token");
    if (!token) {
      // Navigate to login if not authenticated
      // Replace this with your actual navigation logic
      alert("Please login first");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5000/product/delete/${productId}`,
        {
          headers: {
            "Auth-Token": token,
          },
        }
      );

      if (response.data.success) {
        alert("Product deleted successfully");
        // Refresh the product list
        const updatedProducts = products.filter(
          (product) => product._id !== productId
        );
        setProducts(updatedProducts);
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Delete product error:", error);
      alert("An error occurred while deleting the product");
    }
  }

  return (
    <div>
      <Header />
      <div className="products">
        {products.map((product) => (
          <div key={product._id} className="product">
            <img src={product.image} alt={product.name} />

            <Link to={`/product/${product._id}`} className="link-style">
              <h2>{product.name}</h2>
            </Link>
            <p className="price">{product.price.toLocaleString()}đ</p>

            {isAdmin ? (
              <>
                <div>
                  {/* <button
                    onClick={() => editProduct(product._id)}
                    style={{ width: "165px", height: "50px" }}
                  >
                    Edit Product
                  </button> */}
                  <Link to={`/editProduct/${product._id}`}>
                    <button style={{ width: "165px", height: "50px" }}>
                      Edit Product
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    style={{
                      width: "165px",
                      height: "50px",
                      padding: "10px 10px",
                    }}
                  >
                    Delete Product
                  </button>
                </div>
              </>
            ) : (
              <>
                <button onClick={() => addToCart(product._id)}>
                  Add to Cart
                </button>
              </>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Product;
