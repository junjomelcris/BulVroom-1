import React, { useState } from 'react';
import axios from 'axios';

function Profile() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send selected options to the backend
      const response = await axios.post('http://localhost:8082/option', { selectedOptions });
      console.log(response.data);
      // You can optionally add a success message or perform other actions here.
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Select Options</h1>
      <form onSubmit={handleSubmit}>
        {options.map((option, index) => (
          <div key={index}>
            <label>
              <input
                type="checkbox" id="Data"
                checked={selectedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              {option}
            </label>
          </div>
        ))}
        <button type="submit">Save Selected Options</button>
      </form>
    </div>
  );
}

export default Profile;
