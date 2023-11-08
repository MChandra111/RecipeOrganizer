import React, { useState, useEffect } from 'react';
import './App.css';
import Logobar from "./components/Logobar";
import Searchbar from './components/Searchbar';
import DataDisplay from './components/DataDisplay';
import axios from 'axios';

function App() {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3500/recipes')
      .then((response) => {
        setEntries(response.data);
        setFilteredEntries(response.data); // Initially set filtered entries to all entries
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = entries.filter(entry => {
    const lowerCaseTerm = searchTerm.toLowerCase();

    return (
      entry.name.toLowerCase().includes(lowerCaseTerm) ||
      entry.description.toLowerCase().includes(lowerCaseTerm) ||
      entry.ingredients.some(ingredient =>
        ingredient.toLowerCase().includes(lowerCaseTerm)
      )
    );
    });
    setFilteredEntries(filtered);
  };

  return (
    <div className="App">
        <Logobar />
        <Searchbar onSearch={handleSearch} />
      <div className='allSquares'>
        <DataDisplay entries={filteredEntries} />
      </div>
    </div>
  );
}

export default App;
