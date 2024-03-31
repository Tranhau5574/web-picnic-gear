import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = ({ match }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        image: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get(`http://localhost:5000/product/view/${id}`);
            setProduct(response.data);
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.put(`http://localhost:5000/product/update/${id}`, product, {
                headers: {
                    "Auth-token": token,
                },
            });
            alert("Product updated successfully");
        } catch (error) {
            console.error(error);
            alert("An error occurred while updating the product");
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
                <input type="text" name="image" value={product.image} onChange={handleChange} />
            </label>
            <button type="submit">Update Product</button>
        </form>
    );
};

export default EditProduct;