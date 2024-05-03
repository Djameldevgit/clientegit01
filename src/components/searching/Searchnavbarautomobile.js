import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; 
 
const Searchnavbarautomobile = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
 
    };
  
    return (
      <div className="search-bar" style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '5px', borderRadius: '5px' }}>
      <input
        type="text"
        placeholder="Buscar por venta, ubicación, marca o modelo..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ flex: 1, border: 'none', padding: '8px', fontSize: '14px' }}
      />
      <button onClick={handleSearch} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '8px 10px', borderRadius: '5px', cursor: 'pointer' }}>
        <FaSearch />
      </button>
    </div>
    );
  };

export default Searchnavbarautomobile

