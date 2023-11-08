import React, { useState } from 'react';
import './EntryForm.css';

function EntryForm() {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [steps, setSteps] = useState(['']);
    const [pic, setPic] = useState(['']);
  
    const handleIngredientChange = (index, event) => {
      const values = [...ingredients];
      values[index] = event.target.value;
      setIngredients(values);
    };
  
    const handleStepChange = (index, event) => {
      const values = [...steps];
      values[index] = event.target.value;
      setSteps(values);
    };
  
    const addIngredient = () => {
      setIngredients([...ingredients, '']);
    };
  
    const removeIngredient = (index) => {
      const values = [...ingredients];
      values.splice(index, 1);
      setIngredients(values);
    };
  
    const addStep = () => {
      setSteps([...steps, '']);
    };
  
    const removeStep = (index) => {
      const values = [...steps];
      values.splice(index, 1);
      setSteps(values);
    };
  
    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password === '123') {
          setIsAuthenticated(true);
        }
    };

    const addEntry = async () => {
        try {
          const response = await fetch('http://localhost:3500/recipes/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description, ingredients, steps, pic })
          });
    
          if (response.ok) {
            console.log('New entry added successfully');
          } else {
            console.error('Failed to add entry');
          }
        } catch (error) {
          console.error('Error adding entry:', error);
        }
    };

    if (!isAuthenticated) {
        return (
          <form onSubmit={handlePasswordSubmit}>
            <h2>
                Password:
            </h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            <button type="submit" className='SubmitButton'>Submit</button>
          </form>
        );
    } else {
        return (
        <form onSubmit={addEntry}>
            <h1>Entry Form:</h1>
            <h3 className='Entries'>
                Name:
            </h3>
            <div className="input-group">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
            />
            </div>
            <h3 className='Entries'>
                Description:
            </h3>
            <div className="input-group">
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
            />
            </div>
            <h3 className='Entries'>
                Ingredients:
            </h3>
            {ingredients.map((ingredient, index) => (
            <div key={`ingredient-${index}`} className="input-group">
                <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e)}
                placeholder="Enter ingredient"
                />
                {index === ingredients.length - 1 && (
                <button type="button" onClick={addIngredient} className="add-btn">
                    +
                </button>
                )}
                {index !== 0 && (
                <button type="button" onClick={() => removeIngredient(index)} className="remove-btn">
                    -
                </button>
                )}
            </div>
            ))}
            <h3 className='Entries'>
                Steps:
            </h3>
            {steps.map((step, index) => (
            <div key={`step-${index}`} className="input-group">
                <input
                type="text"
                value={step}
                onChange={(e) => handleStepChange(index, e)}
                placeholder="Enter step"
                />
                {index === steps.length - 1 && (
                <button type="button" onClick={addStep} className="add-btn">
                    +
                </button>
                )}
                {index !== 0 && (
                <button type="button" onClick={() => removeStep(index)} className="remove-btn">
                    -
                </button>
                )}
            </div>
            ))}
            <h3 className='Entries'>
                Pic:
            </h3>
            <div className="input-group">
            <input
                type="text"
                value={pic}
                onChange={(e) => setPic(e.target.value)}
                placeholder="Enter picture url"
            />
            </div>
            <button type="submit" className='SubmitButton'>Submit</button>
        </form>
        );
    }
};


export default EntryForm;