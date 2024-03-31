import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: '' // Thêm trường image vào state product
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post('http://localhost:5000/product/add', product, {
      headers: {
        "Auth-token": token,
      },
    });
      console.log(response.data);
      // Clear the form
      setProduct({
        name: '',
        price: '',
        description: '',
        image: '' // Thêm trường image vào để xóa nó cũng
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={product.name} onChange={handleChange} />
      </label>
      <label>
        Price:
        <input type="number" name="price" value={product.price} onChange={handleChange} />
      </label>
      <label>
        Description:
        <textarea name="description" value={product.description} onChange={handleChange} />
      </label>
      <label>
        Image:
        <input type="text" name="image" value={product.image} onChange={handleChange} /> {/* Thêm trường image */}
      </label>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
