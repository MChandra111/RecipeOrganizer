import React, { useState, useEffect } from 'react';
import "./DataDisplay.css";

const Square = ({ data, squareKey }) => {
    const firstThree = data.ingredients.slice(0,3);
    return (
      <div className='Squares'>
        <div style={{ maxHeight: "200px", overflow: "hidden" }}>
        <img
            src={data.pic}
            alt="food"
            className='foodImage'
        />
        </div>
        <h3>{data.name}</h3>
        <p>{data.description}</p>
        <p>
            Ingredients:
        </p>
            <ul style={{marginTop: "-2px"}}>
                {firstThree.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
                {data.ingredients.length > 3 && <p>...and more</p>}
            </ul>
        {/* Render other properties as needed */}
      </div>
    );
};
  
const DataDisplay = ({ entries }) => {
    const [selectedSquare, setSelectedSquare] = useState(null);

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
                            <div style={{ maxHeight: "560px", overflow: "hidden" }}>
                            <img
                                src={selectedSquare.pic}
                                alt="food"
                                className='modalFoodImage'
                            />
                            </div>
                            <h1>{selectedSquare.name}</h1>
                            <h2>
                                Description
                            </h2>
                            <p>
                                {selectedSquare.description}
                            </p>
                            <h2>Ingredients:</h2>
                                <ul style={{marginTop: "-2px"}}>
                                    {selectedSquare.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
                            <h2>Steps:</h2>
                                <ol style={{marginTop: "-2px"}}>
                                    {selectedSquare.steps.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ol>
                            {/* Display other information */}
                        </div>
                    </div>
                </div>
        )}
        
        {entries.map((entry) => (
            <div className='SquarePlacement' key={entry.id}>
                <div onClick={() => handleSquareClick(entry)}>
                    <Square key={entry._id} data={entry} squareKey={entry._id} />
                </div>
            </div>
        ))}

        </div>
    );
};
  
  export default DataDisplay;