import React, { useState } from 'react';
import Select from 'react-select';

const App = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(input);
            const res = await fetch('http://localhost:3000/bfhl', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(parsedInput)
            });
            const data = await res.json();
            setResponse(data);
        } catch (error) {
            alert('Invalid JSON input');
        }
    };

    const handleSelectChange = (selected) => {
        setSelectedOptions(selected.map(opt => opt.value));
    };

    const renderResponse = () => {
        if (!response) return null;
        const display = {};
        if (selectedOptions.includes('numbers')) display.numbers = response.numbers;
        if (selectedOptions.includes('alphabets')) display.alphabets = response.alphabets;
        if (selectedOptions.includes('highest_lowercase_alphabet')) display.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
        return <pre>{JSON.stringify(display, null, 2)}</pre>;
    };

    return (
        <div>
            <h1>Backend API Client</h1>
            <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder='Enter JSON here'
            />
            <button onClick={handleSubmit}>Submit</button>
            <Select
                isMulti
                options={[
                    { value: 'numbers', label: 'Numbers' },
                    { value: 'alphabets', label: 'Alphabets' },
                    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
                ]}
                onChange={handleSelectChange}
            />
            {renderResponse()}
        </div>
    );
};

export default App;
