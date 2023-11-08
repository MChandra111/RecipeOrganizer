import React, { useState, useEffect } from 'react';
import './Searchbar.css';

const Searchbar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            return("Hello");
          }
    };

    return (
        <div className='Searchbar'>
            <input
                type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Search..."
            />
        </div>
    );
}

export default Searchbar;