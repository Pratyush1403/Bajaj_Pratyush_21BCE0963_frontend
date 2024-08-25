import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await fetch('http://localhost:3000/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedInput),
      });
      const data = await res.json();
      setResponse(data);
      setError('');
    } catch (err) {
      setError('Invalid JSON format');
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">21BCE0149</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border mb-2"
          rows="5"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON like {"data": ["A","C","z"]}'
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Submit
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {response && (
        <div className="mt-4">
          <h2 className="text-xl">Filtered Response</h2>
          <div className="mb-2">
            <select
              multiple
              className="border p-2"
              onChange={(e) =>
                handleOptionChange(e.target.value)
              }
            >
              <option value="Alphabets">Alphabets</option>
              <option value="Numbers">Numbers</option>
              <option value="Highest Lowercase Alphabet">Highest Lowercase Alphabet</option>
            </select>
          </div>
          <div>
            {selectedOptions.includes('Alphabets') && (
              <p>Alphabets: {response.alphabets.join(', ')}</p>
            )}
            {selectedOptions.includes('Numbers') && (
              <p>Numbers: {response.numbers.join(', ')}</p>
            )}
            {selectedOptions.includes('Highest Lowercase Alphabet') && (
              <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(', ')}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;