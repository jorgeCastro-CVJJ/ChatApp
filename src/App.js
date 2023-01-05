// Create a react component that inputs a textarea message then performs a fetch request to localhost:3001 and gets back a response a data.message and displays that message in a box below

import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    setResponse(data.message);
  };

  return (
    <div className="App">
      <h1>Steve Jobs ChatApp</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          placeholder="Ask Steve anything"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {response && <div><b>Steve:</b>{response}</div>}
    </div>
  );
}

export default App;