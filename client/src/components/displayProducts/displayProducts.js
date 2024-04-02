// ProductList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './displayProduct.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the server when the component mounts
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3002/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (productId, quantity) => {
    // Implement your add to cart functionality here
    console.log(`Added ${quantity} of product ${productId} to cart`);
  };

  return (
    <div className="product-list-container">
      <h2>Product List</h2>
      <div className="product-list">
        {products.map(product => (
          <div key={product._id} className="product-item">
            {product.productImageURL && (
              <img
                src={product.productImageURL}
                alt="Product"
                className="product-image"
              />
            )}
            <div className="product-item-content">
              <p className="product-price">Price: ${product.price}</p>
              <h3>{product.productName}</h3>
              <p className="product-details">Details: {product.productDetails}</p>
              <div className="add-to-cart-section">
                <input type="number" defaultValue="1" min="1" className="quantity-input" />
                <button className="add-to-cart-button" onClick={() => addToCart(product._id, 1)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
