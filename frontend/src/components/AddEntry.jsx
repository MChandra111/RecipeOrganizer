import React, { useState, useEffect } from 'react';
import EntryForm from './EntryForm';

function AddEntry() {
    const [modalOpen, setModalOpen] = useState(false);

    const handleClick = () => {
        setModalOpen(true);
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
        setModalOpen(false);
    }


    return (
        <div>
        {modalOpen && (
        <div className="overlay">
            <div className="modal">
                <EntryForm />
            </div>
        </div>
        )}
            <button className='AddEntry' onClick={handleClick}>Add New Entry</button>
        </div>
    );
}

export default AddEntry;