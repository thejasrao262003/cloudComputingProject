// ProductSearchBar.js

import React, { useState } from 'react';
import './ProductSearchBar.css'; // Import CSS file for styling

const ProductSearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="product-search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default ProductSearchBar;
