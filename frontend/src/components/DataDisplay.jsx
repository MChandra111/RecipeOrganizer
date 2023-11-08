import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./DataDisplay.css";

const Square = ({ data }) => {
    const firstThree = data.ingredients.slice(0,3);
    return (
      <div className='Squares'>
        <img
            src={data.pic}
            alt="Picture"
            className='foodImage'
        />
        <h3>{data.name}</h3>
        <p>{data.description}</p>
        <p>
            Ingredients:
            <ul style={{marginTop: "-2px"}}>
                {firstThree.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
                {data.ingredients.length > 3 && <p>...and more</p>}
            </ul>
        </p>
        {/* Render other properties as needed */}
      </div>
    );
};
  
const DataDisplay = () => {
    const [entries, setEntries] = useState([]);
    const [selectedSquare, setSelectedSquare] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3500/recipes')
        .then((response) => {
            setEntries(response.data);
        })
        .catch((error) => {
            console.error('Error fetching data', error);
        });
    }, []);

    const handleSquareClick = (data) => {
        setSelectedSquare(data);
    }

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                closeSquareModal();
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const closeSquareModal = () => {
        setSelectedSquare(null); // Clear the selected square
    };
    
    return (
        <div className='allSquares'>
        {selectedSquare && (
                <div>
                    <div className="overlay" onClick={closeSquareModal}></div>
                    <div className="modal">
                        <div className="modal-content">
                            <img
                                src={selectedSquare.pic}
                                alt="Picture"
                                className='modalFoodImage'
                            />
                            <h1>{selectedSquare.name}</h1>
                            <h2>
                                Description
                            </h2>
                            <p>
                                {selectedSquare.description}
                            </p>
                            <h2>Ingredients:</h2>
                            <p>
                                <ul style={{marginTop: "-2px"}}>
                                    {selectedSquare.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
                            </p>
                            <h2>Steps:</h2>
                            <p>
                                <ol style={{marginTop: "-2px"}}>
                                    {selectedSquare.steps.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ol>
                            </p>
                            
                            {/* Display other information */}
                        </div>
                    </div>
                </div>
        )}
        
        {entries.map((entry) => (
            <div className='SquarePlacement' key={entry.id}>
                <div onClick={() => handleSquareClick(entry)}>
                    <Square key={entry._id} data={entry} />
                </div>
            </div>
        ))}

        </div>
    );
};
  
  export default DataDisplay;