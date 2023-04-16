// Import the necessary modules
import React, { useState } from 'react';
import axios from 'axios';

// Define the React component
const DynamicInputForm = () => {
  // State to store the input fields and their values
  const [inputs, setInputs] = useState([{ value: '' }]);

  // Function to handle input field changes
  const handleInputChange = (index, event) => {
    const values = [...inputs];
    values[index].value = event.target.value;
    setInputs(values);
  };

  // Function to handle adding a new input field
  const handleAddInput = () => {
    const values = [...inputs];
    values.push({ value: '' });
    setInputs(values);
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      // Send data to the server
      await axios.post(' http://localhost:3001/api/data', { data: inputs });

      // Clear input fields after successful submission
      setInputs([{ value: '' }]);
      alert('Data submitted successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to submit data. Please try again later.');
    }
  };

  return (
    <div>
      {/* Render input fields */}
      {inputs.map((input, index) => (
        <input
          key={index}
          type="text"
          value={input.value}
          onChange={event => handleInputChange(index, event)}
        />
      ))}

      {/* Render button to add input field */}
      <button onClick={handleAddInput}>Add Input Field</button>

      {/* Render button to submit form */}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default DynamicInputForm;


