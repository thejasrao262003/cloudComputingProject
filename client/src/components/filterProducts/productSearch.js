import React, { useState } from 'react';
import ProductSearchBar from './filterProduct';

const ParentComponent = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(`/products?search=${searchTerm}`); // Assuming your backend API endpoint supports search
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching for products:', error);
    }
  };

  return (
    <div>
      <ProductSearchBar onSearch={handleSearch} />
      {/* Render search results */}
      <ul>
        {searchResults.map(product => (
          <li key={product._id}>{product.productName}</li>
        ))}
      </ul>
    </div>
  );
};

export default ParentComponent;
