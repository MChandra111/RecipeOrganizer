import React, { useState } from 'react';
import './Searchbar.css';

const Searchbar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSearch(e.target.value);
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