import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CheckoutPage = () => {
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [paymentOption, setPaymentOption] = useState('cash');
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [bankName, setBankName] = useState('');
    const [upiPin, setUpiPin] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            fetchCartItems(parsedUser.email); // Fetch cart items using user's email
        }
    }, []);

    const fetchCartItems = async (userEmail) => {
        try {
            const response = await axios.get(`http://localhost:5003/api/order/cart/${userEmail}`);
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const handleCheckout = () => {
        console.log('Checkout clicked');
    };

    return (
        <div>
            <h1>Checkout Page</h1>
            {cartItems && cartItems.length > 0 ? (
                <div>
                    <h2>Products in Cart:</h2>
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={`${item.productId}-${index}`}>{item.productName}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No items in cart</p>
            )}
            <label htmlFor="deliveryAddress">Delivery Address:</label>
            <input type="text" id="deliveryAddress" value={deliveryAddress} onChange={e => setDeliveryAddress(e.target.value)} />
            <label htmlFor="paymentOption">Payment Option:</label>
            <select id="paymentOption" value={paymentOption} onChange={e => setPaymentOption(e.target.value)}>
                <option value="cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="debitCard">Debit Card</option>
                <option value="creditCard">Credit Card</option>
            </select>
            {/* Add inputs for card details and UPI details based on payment option */}
            <button onClick={handleCheckout}>Checkout</button>
        </div>
    );
};

export default CheckoutPage;
