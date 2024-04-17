import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Cart.css";
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchCartItems(user.email);
    }
  }, [user]);

  const fetchCartItems = async (userEmail) => {
    try {
      const response = await axios.get(`http://localhost:5003/cart/${userEmail}`);
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:5002/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product details:', error);
      return null;
    }
  };

  const removeFromCart = (productId) => {
    // Dummy function to remove item from cart
    console.log('Removing item with ID:', productId);
  };

  const handleCheckout = () => {
    // Handle checkout action
    console.log('Checkout clicked');
  };

  return (
    <div className="cart-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.productId} item={item} removeFromCart={removeFromCart} fetchProductDetails={fetchProductDetails} />
        ))}
      </div>
      <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

const CartItem = ({ item, removeFromCart, fetchProductDetails }) => {
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    fetchProductDetails(item.productId).then((details) => {
      setProductDetails(details);
    });
  }, [fetchProductDetails, item.productId]);

  const handleRemove = () => {
    removeFromCart(item.productId);
  };

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={productDetails.productImageURL} alt={productDetails.productName} />
      </div>
      <div className="item-details">
        <p className="item-name">{productDetails.productName}</p>
        <p className="item-price">${productDetails.price}</p>
        <button className="remove-button" onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
};

export default CartPage;
